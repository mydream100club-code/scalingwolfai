import { Lead } from '../types/leads';
import { Proposal } from '../types/proposals';
import { Deal } from '../types/deals';

interface AIProposalInput {
  description: string;
  objectives: string;
  budget: number;
  timeline: string;
  additionalNotes?: string;
}

interface AIProposalResponse {
  success: boolean;
  error?: string;
  title?: string;
  proposal_text?: string;
  proposal_value?: number;
  deliverables?: string[];
  timelines?: string[];
  proposal_link?: string;
}

class AIProposalService {
  async sendAIProposalRequest(
    lead: Lead,
    input: AIProposalInput,
    userId: string,
    existingProposal?: Proposal,
    deal?: Deal
  ): Promise<AIProposalResponse> {
    try {
      // Mock AI proposal generation
      // In a real implementation, this would call an AI service (OpenAI, Claude, etc.)

      const companyName = lead.company || `${lead.first_name} ${lead.last_name}`;
      const proposalTitle = existingProposal
        ? `Updated Proposal for ${companyName}`
        : `Proposal for ${companyName}`;

      // Generate mock proposal text
      const proposalText = this.generateProposalText(lead, input, deal);

      // Generate mock deliverables
      const deliverables = this.generateDeliverables(input);

      // Generate mock timelines
      const timelines = this.generateTimelines(input);

      return {
        success: true,
        title: proposalTitle,
        proposal_text: proposalText,
        proposal_value: input.budget || deal?.deal_value || 15000,
        deliverables,
        timelines,
        proposal_link: ''
      };
    } catch (error: any) {
      console.error('AI Proposal Service Error:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate proposal'
      };
    }
  }

  private generateProposalText(lead: Lead, input: AIProposalInput, deal?: Deal): string {
    const companyName = lead.company || `${lead.first_name} ${lead.last_name}`;

    return `
# Proposal for ${companyName}

## Executive Summary
This proposal outlines our comprehensive solution designed to meet your specific needs and objectives.

## Project Description
${input.description}

## Objectives
${input.objectives}

## Scope of Work
We will deliver a complete solution that addresses your requirements through a structured approach:

1. Initial consultation and requirements gathering
2. Solution design and planning
3. Implementation and deployment
4. Testing and quality assurance
5. Training and documentation
6. Ongoing support and maintenance

## Budget
Total Project Value: $${input.budget.toLocaleString()}

## Timeline
Project Duration: ${input.timeline}

${input.additionalNotes ? `## Additional Notes\n${input.additionalNotes}` : ''}

## Next Steps
Upon approval of this proposal, we will:
1. Schedule a kickoff meeting
2. Assign dedicated team members
3. Begin the discovery phase
4. Establish regular communication channels

We look forward to partnering with you on this project.
    `.trim();
  }

  private generateDeliverables(input: AIProposalInput): string[] {
    return [
      'Complete project documentation',
      'Implementation of all agreed features',
      'Quality assurance testing results',
      'User training materials',
      'Post-launch support documentation',
      'Final project report'
    ];
  }

  private generateTimelines(input: AIProposalInput): string[] {
    return [
      'Week 1-2: Discovery and Planning',
      'Week 3-4: Design and Architecture',
      'Week 5-8: Development and Implementation',
      'Week 9-10: Testing and Quality Assurance',
      'Week 11: Training and Documentation',
      'Week 12: Launch and Handover'
    ];
  }
}

const aiProposalService = new AIProposalService();
export default aiProposalService;
