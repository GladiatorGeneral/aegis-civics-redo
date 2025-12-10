// Lightweight chat-to-orchestrator bridge. Replace fetch endpoints with real backend URLs.
import { AgentType, MessageType } from '@/neural-agents/core/agent_protocol';

type ChatRoom = { id: string; topic?: string };

type ChatMessage = {
  type: string;
  roomId: string;
  content: string;
  sender: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

export class ChatAIIntegration {
  private orchestratorUrl = 'http://orchestrator:8000';

  async handleAITrigger(message: string, room: ChatRoom, userId: string) {
    const triggers = [
      { pattern: /@ConstitutionalAI/i, agent: 'constitutional' },
      { pattern: /@LegislativePredictor/i, agent: 'legislative' },
      { pattern: /analyze this bill/i, agent: 'all' },
      { pattern: /is this constitutional/i, agent: 'constitutional' },
    ];

    for (const trigger of triggers) {
      if (trigger.pattern.test(message)) {
        const analysis = await this.callAIWorkflow(message, room, userId, trigger.agent);
        await this.postAIResponse(room.id, analysis);
        break;
      }
    }
  }

  async callAIWorkflow(message: string, room: ChatRoom, userId: string, agent: string) {
    const context = await this.getChatContext(room.id, 20);

    const response = await fetch(`${this.orchestratorUrl}/orchestrate/custom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agents: agent === 'all' ? ['constitutional', 'legislative', 'sentiment'] : [agent],
        tasks: [
          {
            query: `Analyze this civic discussion: ${message}`,
            context: {
              chat_history: context,
              room_topic: room.topic,
              user_id: userId,
            },
          },
        ],
        parallel: true,
      }),
    });

    return response.json();
  }

  async getChatContext(roomId: string, limit: number) {
    const response = await fetch(`${this.orchestratorUrl}/vector/context?roomId=${roomId}&limit=${limit}`);
    return response.json();
  }

  async postAIResponse(roomId: string, analysis: any) {
    const aiMessage: ChatMessage = {
      type: 'AI_RESPONSE',
      roomId,
      content: this.formatAnalysis(analysis),
      sender: 'USAMind AI',
      timestamp: new Date().toISOString(),
      metadata: {
        agents_used: analysis.agents_used,
        confidence: analysis.synthesis?.confidence,
        actions: analysis.synthesis?.actions,
      },
    };

    await this.broadcastToRoom(roomId, aiMessage);
  }

  formatAnalysis(analysis: any): string {
    const summary = analysis.synthesis?.summary || 'Analysis complete.';
    const keyPoints = (analysis.synthesis?.key_points || []).map((p: string) => `• ${p}`).join('\n');
    const actions = (analysis.synthesis?.actions || [])
      .map((a: any) => `▶️ ${a.type}: ${a.description}`)
      .join('\n');

    return `🤖 USAMind Neural Analysis\n\n${summary}\n\nKey Insights:\n${keyPoints}\n\nRecommended Actions:\n${actions}\n\nAnalysis by: ${
      (analysis.agents_used || []).join(', ') || 'orchestrator'
    }`;
  }

  async broadcastToRoom(roomId: string, message: ChatMessage) {
    // Placeholder: wire to your socket layer or API.
    console.log(`Broadcast to room ${roomId}:`, message.type);
  }
}
