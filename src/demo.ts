export type Outcome = 'green' | 'yellow' | 'red' | 'inconclusive';
export type Screen =
  | 'home'
  | 'learn'
  | 'welcome'
  | 'questionnaire'
  | 'chat'
  | 'capture'
  | 'result'
  | 'referral'
  | 'reports'
  | 'report';
export type Answers = Record<string, string>;

export const questions = [
  {
    id: 'discomfort',
    title: 'How have your eyes been feeling recently?',
    subtitle: 'Choose the answer that best describes your experience.',
    options: ['Comfortable', 'Occasionally uncomfortable', 'Frequently uncomfortable'],
  },
  {
    id: 'pain',
    title: 'Do you notice pain when moving your eyes?',
    subtitle: 'For example, when looking from side to side.',
    options: ['No', 'Sometimes', 'Often', 'Not sure'],
  },
  {
    id: 'diplopia',
    title: 'How often do you experience double vision?',
    subtitle: 'Double vision means seeing two images of the same object.',
    options: ['Never', 'Occasionally', 'Frequently', 'Not sure'],
  },
  {
    id: 'impact',
    title: 'How much do your eye symptoms affect your day?',
    subtitle: 'Think about reading, getting around, work, or social activities.',
    options: ['Not at all', 'A little', 'Quite a bit', 'Prefer not to answer'],
  },
] as const;

export const captureSteps = [
  { title: 'Look straight ahead', note: 'Position your face inside the guide.', gaze: 'center' },
  {
    title: 'Look to your left',
    note: 'Imagine following a target while keeping your head still.',
    gaze: 'left',
  },
  { title: 'Look to your right', note: 'Keep your face facing forward.', gaze: 'right' },
  { title: 'Look up', note: 'Move your eyes toward the target above.', gaze: 'up' },
  { title: 'Look down', note: 'Move your eyes toward the target below.', gaze: 'down' },
  {
    title: 'Gently close your eyes',
    note: 'This completes the illustrative capture sequence.',
    gaze: 'closed',
  },
] as const;

export const outcomes: Record<
  Outcome,
  {
    name: string;
    title: string;
    summary: string;
    color: string;
    tint: string;
    next: string;
    detail: string;
  }
> = {
  green: {
    name: 'Green',
    title: 'No significant signs in this example',
    summary:
      'This sample illustrates a screening with no significant abnormal signs detected. A screening can miss disease and cannot rule out TED.',
    color: '#277154',
    tint: '#EAF5EE',
    next: 'Stay informed about your eye health',
    detail:
      'If symptoms persist, change, or concern you, seek professional assessment regardless of a screening result.',
  },
  yellow: {
    name: 'Yellow',
    title: 'A closer look would be helpful',
    summary:
      'This sample illustrates findings that merit professional assessment. It does not establish a diagnosis, severity, or disease activity.',
    color: '#896020',
    tint: '#FFF5DD',
    next: 'Arrange a professional assessment',
    detail:
      'A clinician can review your symptoms, examine your eyes, and discuss the appropriate next step.',
  },
  red: {
    name: 'Red',
    title: 'Professional assessment is important',
    summary:
      'This sample illustrates the higher-priority pathway. In a real system, clinically approved red flags and referral rules would determine urgency.',
    color: '#AF4747',
    tint: '#FCEEEE',
    next: 'Follow the urgent-assessment pathway',
    detail:
      'The clinical team must define the urgency, contact details, and destination for this pathway before use with patients.',
  },
  inconclusive: {
    name: 'Inconclusive',
    title: 'There is not enough reliable information',
    summary:
      'This sample illustrates insufficient capture quality or incomplete information. It must not be interpreted as a low-risk result.',
    color: '#5D6680',
    tint: '#EEF0F7',
    next: 'Repeat the capture or seek assessment',
    detail:
      'A real screening may be inconclusive when images are unclear or information cannot be interpreted reliably.',
  },
};

export function buildReport(outcome: Outcome, answers: Answers, date: string, example = false) {
  const result = outcomes[outcome];
  return [
    'SaveMoreTED — DEMONSTRATION REPORT',
    'Simulated data. Not a medical assessment or diagnosis.',
    `Demo session: ${date}`,
    `Presenter-selected sample: ${result.name}`,
    result.title,
    result.summary,
    '',
    example
      ? 'QUESTIONNAIRE — fictional example responses'
      : 'QUESTIONNAIRE — responses entered during this demo',
    ...questions.map((q) => `${q.title}\n${answers[q.id] ?? 'Not answered'}`),
    '',
    'CAPTURE — simulated; no camera used and no photos collected',
    outcome === 'inconclusive'
      ? 'Quality: insufficient (sample scenario). Ocular measurements unavailable.'
      : 'Quality: acceptable (simulated). MRD1: right 4.0 / left 4.5 mm; lid aperture: right 9.0 / left 9.5 mm. Fictional illustration values, not measured.',
    'Proptosis, motility, lid lag, and CAS: not assessed.',
    '',
    'EXAMPLE NEXT STEP',
    result.next,
    result.detail,
    '',
    'No referral has been sent or appointment booked.',
    'Clinical protocol, interpretation, scoring, and referral criteria require professional definition and validation.',
  ].join('\n');
}
