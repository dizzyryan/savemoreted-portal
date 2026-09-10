import type { Answers, Outcome } from './demo';

export type DemoReport = {
  id: string;
  createdAt: string;
  answers: Answers;
  outcome: Outcome;
  example: boolean;
};
let sequence = 0;
export function createDemoReport(
  answers: Answers,
  outcome: Outcome,
  date = new Date(),
): DemoReport {
  return {
    id: `session-${date.getTime()}-${sequence++}`,
    createdAt: date.toISOString(),
    answers: { ...answers },
    outcome,
    example: false,
  };
}
export function sampleReports(): DemoReport[] {
  const today = new Date();
  return (['yellow', 'inconclusive'] as const).map((outcome, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (index === 0 ? 3 : 14));
    date.setHours(10, 30, 0, 0);
    return {
      id: `example-${index}`,
      createdAt: date.toISOString(),
      outcome,
      example: true,
      answers: {
        discomfort: 'Occasionally uncomfortable',
        pain: 'Sometimes',
        diplopia: 'Never',
        impact: 'A little',
      },
    };
  });
}
export function reportDate(date: string) {
  return new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
