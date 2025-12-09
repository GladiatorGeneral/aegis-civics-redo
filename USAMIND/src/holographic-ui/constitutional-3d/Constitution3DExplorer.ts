/**
 * 3D CONSTITUTION EXPLORER
 * Interactive 3D visualization of the U.S. Constitution
 * WebGL-powered with AR capabilities
 */

export interface ConstitutionSection {
  id: string;
  type: 'preamble' | 'article' | 'amendment';
  number?: number;
  title: string;
  shortTitle: string;
  text: string;
  subsections?: ConstitutionSubsection[];
  position3D: { x: number; y: number; z: number };
  connections: string[];
  importance: number;
}

export interface ConstitutionSubsection {
  id: string;
  title: string;
  text: string;
  clauses?: string[];
}

export interface Constitution3DConfig {
  scale: number;
  rotationSpeed: number;
  highlightColor: string;
  connectionColor: string;
  backgroundColor: string;
  enableAR: boolean;
}

export const CONSTITUTION_DATA: ConstitutionSection[] = [
  {
    id: 'preamble',
    type: 'preamble',
    title: 'Preamble',
    shortTitle: 'Preamble',
    text: 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.',
    position3D: { x: 0, y: 5, z: 0 },
    connections: ['article1', 'article2', 'article3'],
    importance: 1.0
  },
  {
    id: 'article1',
    type: 'article',
    number: 1,
    title: 'Article I - The Legislative Branch',
    shortTitle: 'Legislative',
    text: 'All legislative Powers herein granted shall be vested in a Congress of the United States, which shall consist of a Senate and House of Representatives.',
    subsections: [
      {
        id: 'art1-sec1',
        title: 'Section 1 - Congress',
        text: 'All legislative Powers herein granted shall be vested in a Congress of the United States.'
      },
      {
        id: 'art1-sec8',
        title: 'Section 8 - Powers of Congress',
        text: 'The Congress shall have Power To lay and collect Taxes, Duties, Imposts and Excises...',
        clauses: [
          'To regulate Commerce with foreign Nations',
          'To coin Money',
          'To establish Post Offices',
          'To declare War'
        ]
      }
    ],
    position3D: { x: -3, y: 2, z: 0 },
    connections: ['preamble', 'article2', 'amendment1'],
    importance: 0.95
  },
  {
    id: 'article2',
    type: 'article',
    number: 2,
    title: 'Article II - The Executive Branch',
    shortTitle: 'Executive',
    text: 'The executive Power shall be vested in a President of the United States of America.',
    position3D: { x: 0, y: 2, z: 0 },
    connections: ['preamble', 'article1', 'article3', 'amendment22'],
    importance: 0.95
  },
  {
    id: 'article3',
    type: 'article',
    number: 3,
    title: 'Article III - The Judicial Branch',
    shortTitle: 'Judicial',
    text: 'The judicial Power of the United States, shall be vested in one supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish.',
    position3D: { x: 3, y: 2, z: 0 },
    connections: ['preamble', 'article1', 'article2'],
    importance: 0.95
  },
  {
    id: 'amendment1',
    type: 'amendment',
    number: 1,
    title: 'First Amendment - Freedom of Religion, Speech, Press, Assembly, Petition',
    shortTitle: '1st Amendment',
    text: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
    position3D: { x: -4, y: -1, z: 1 },
    connections: ['article1', 'amendment2', 'amendment14'],
    importance: 1.0
  },
  {
    id: 'amendment2',
    type: 'amendment',
    number: 2,
    title: 'Second Amendment - Right to Bear Arms',
    shortTitle: '2nd Amendment',
    text: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
    position3D: { x: -3, y: -1, z: 1 },
    connections: ['amendment1', 'amendment3'],
    importance: 0.85
  },
  {
    id: 'amendment4',
    type: 'amendment',
    number: 4,
    title: 'Fourth Amendment - Search and Seizure',
    shortTitle: '4th Amendment',
    text: 'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated.',
    position3D: { x: -1, y: -1, z: 1 },
    connections: ['amendment1', 'amendment5', 'amendment14'],
    importance: 0.9
  },
  {
    id: 'amendment5',
    type: 'amendment',
    number: 5,
    title: 'Fifth Amendment - Due Process, Self-Incrimination',
    shortTitle: '5th Amendment',
    text: 'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury...',
    position3D: { x: 0, y: -1, z: 1 },
    connections: ['amendment4', 'amendment6', 'amendment14'],
    importance: 0.9
  },
  {
    id: 'amendment14',
    type: 'amendment',
    number: 14,
    title: 'Fourteenth Amendment - Equal Protection',
    shortTitle: '14th Amendment',
    text: 'All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside.',
    position3D: { x: 2, y: -2, z: 1 },
    connections: ['amendment1', 'amendment4', 'amendment5', 'amendment15'],
    importance: 0.95
  },
  {
    id: 'amendment15',
    type: 'amendment',
    number: 15,
    title: 'Fifteenth Amendment - Voting Rights',
    shortTitle: '15th Amendment',
    text: 'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of race, color, or previous condition of servitude.',
    position3D: { x: 3, y: -2, z: 1 },
    connections: ['amendment14', 'amendment19', 'amendment24'],
    importance: 0.9
  },
  {
    id: 'amendment19',
    type: 'amendment',
    number: 19,
    title: 'Nineteenth Amendment - Women\'s Suffrage',
    shortTitle: '19th Amendment',
    text: 'The right of citizens of the United States to vote shall not be denied or abridged by the United States or by any State on account of sex.',
    position3D: { x: 4, y: -2, z: 1 },
    connections: ['amendment15', 'amendment24', 'amendment26'],
    importance: 0.9
  }
];

export class Constitution3DExplorer {
  private sections: ConstitutionSection[];
  private config: Constitution3DConfig;
  private selectedSection: string | null = null;
  private hoveredSection: string | null = null;

  constructor(config?: Partial<Constitution3DConfig>) {
    this.sections = CONSTITUTION_DATA;
    this.config = {
      scale: 1.0,
      rotationSpeed: 0.001,
      highlightColor: '#00f3ff',
      connectionColor: '#b967ff',
      backgroundColor: '#0a0e17',
      enableAR: false,
      ...config
    };
  }

  /**
   * Get all sections
   */
  getSections(): ConstitutionSection[] {
    return this.sections;
  }

  /**
   * Get section by ID
   */
  getSection(id: string): ConstitutionSection | undefined {
    return this.sections.find(s => s.id === id);
  }

  /**
   * Get connected sections
   */
  getConnections(sectionId: string): ConstitutionSection[] {
    const section = this.getSection(sectionId);
    if (!section) return [];
    
    return section.connections
      .map(id => this.getSection(id))
      .filter((s): s is ConstitutionSection => s !== undefined);
  }

  /**
   * Search sections by keyword
   */
  search(query: string): ConstitutionSection[] {
    const lowerQuery = query.toLowerCase();
    return this.sections.filter(section =>
      section.title.toLowerCase().includes(lowerQuery) ||
      section.text.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Get sections by type
   */
  getSectionsByType(type: ConstitutionSection['type']): ConstitutionSection[] {
    return this.sections.filter(s => s.type === type);
  }

  /**
   * Select a section
   */
  selectSection(id: string | null): void {
    this.selectedSection = id;
  }

  /**
   * Get selected section
   */
  getSelectedSection(): ConstitutionSection | null {
    if (!this.selectedSection) return null;
    return this.getSection(this.selectedSection) || null;
  }

  /**
   * Hover over a section
   */
  hoverSection(id: string | null): void {
    this.hoveredSection = id;
  }

  /**
   * Get 3D scene data for rendering
   */
  getSceneData(): {
    nodes: Array<{
      id: string;
      position: { x: number; y: number; z: number };
      size: number;
      color: string;
      label: string;
      selected: boolean;
      hovered: boolean;
    }>;
    edges: Array<{
      from: string;
      to: string;
      color: string;
    }>;
  } {
    const nodes = this.sections.map(section => ({
      id: section.id,
      position: {
        x: section.position3D.x * this.config.scale,
        y: section.position3D.y * this.config.scale,
        z: section.position3D.z * this.config.scale
      },
      size: section.importance * 0.5,
      color: this.getSectionColor(section),
      label: section.shortTitle,
      selected: section.id === this.selectedSection,
      hovered: section.id === this.hoveredSection
    }));

    const edges: Array<{ from: string; to: string; color: string }> = [];
    const addedEdges = new Set<string>();

    this.sections.forEach(section => {
      section.connections.forEach(targetId => {
        const edgeKey = [section.id, targetId].sort().join('-');
        if (!addedEdges.has(edgeKey)) {
          edges.push({
            from: section.id,
            to: targetId,
            color: this.config.connectionColor
          });
          addedEdges.add(edgeKey);
        }
      });
    });

    return { nodes, edges };
  }

  /**
   * Get color based on section type
   */
  private getSectionColor(section: ConstitutionSection): string {
    if (section.id === this.selectedSection) {
      return this.config.highlightColor;
    }

    switch (section.type) {
      case 'preamble':
        return '#ffd93d';
      case 'article':
        return '#00ff9d';
      case 'amendment':
        return '#b967ff';
      default:
        return '#ffffff';
    }
  }

  /**
   * Export for AR session
   */
  exportForAR(): {
    anchors: Array<{
      id: string;
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
      scale: number;
      content: string;
    }>;
  } {
    return {
      anchors: this.sections.map(section => ({
        id: section.id,
        position: section.position3D,
        rotation: { x: 0, y: 0, z: 0 },
        scale: section.importance,
        content: section.shortTitle
      }))
    };
  }
}
