export type SupportTier = 'mild' | 'moderate' | 'crisis' | null;
type Topic = 'pain' | 'diplopia' | 'impact' | null;
type ChatMessage = { id: number; role: 'user' | 'assistant'; text: string };
export type ChatSession = {
  messages: ChatMessage[];
  topic: Topic;
  support: SupportTier;
};

export function initialChat(): ChatSession {
  return {
    messages: [
      {
        id: 0,
        role: 'assistant',
        text: 'Hi, I’m your eye companion. Tell me how your eyes have been feeling, or how symptoms affect your day. Use fictional details while exploring this demo.',
      },
    ],
    topic: null,
    support: null,
  };
}

// Presentation-only phrase matching, not clinical NLP or a validated distress detector.
// Unrecognized wording, negation, context, and other languages are not reliably understood.
export function replyToDemoMessage(
  message: string,
  context: { topic: Topic; support: SupportTier } = { topic: null, support: null },
): { text: string; topic: Topic; support: SupportTier } {
  const text = message.toLowerCase().replace(/[’‘]/g, "'");
  if (
    context.support === 'crisis' ||
    /suicid|kill myself|end my life|hurt myself|harm myself|don't want to live/.test(text)
  ) {
    return {
      topic: null,
      support: 'crisis',
      text: 'I’m sorry you’re going through this. Your safety comes first. If you may act on these thoughts or are in immediate danger, contact local emergency services or go to an emergency department. If possible, reach out to someone you trust to stay with you. The symptom conversation is paused.',
    };
  }
  if (/overwhelm|cannot cope|can't cope|hopeless|can't go on|cannot go on/.test(text)) {
    return {
      topic: null,
      support: 'moderate',
      text: 'That sounds like a lot to carry. You deserve support from someone who can listen. Consider contacting a qualified professional or a local mental-health support service. You can find Hong Kong support resources below.',
    };
  }
  if (/worr|anxious|scared|upset|sad|stress/.test(text)) {
    return {
      topic: null,
      support: 'mild',
      text: 'It sounds like this has been worrying you. It may help to talk with someone you trust, such as a friend, family member, or your primary-care professional. We can also keep a note of how your eye symptoms affect daily life.',
    };
  }
  if (/double|diplopia|seeing two/.test(text)) {
    return {
      topic: 'diplopia',
      support: null,
      text: 'Thank you for sharing. How often do you notice double vision: occasionally, most of the time, or only in certain situations? I can help organize your description, but I can’t determine its cause.',
    };
  }
  if (/pain|hurt|ache|discomfort|sore/.test(text)) {
    return {
      topic: 'pain',
      support: null,
      text: 'I’m sorry your eyes feel uncomfortable. Do you notice it while resting, while moving your eyes, or both? You can also describe when it started. This demo cannot assess the cause or urgency of pain.',
    };
  }
  if (/read|work|driv|daily|social|sleep|quality of life/.test(text)) {
    return {
      topic: 'impact',
      support: null,
      text: 'How has this changed your usual activities? For example, have you needed to pause reading, change your work routine, or avoid something you normally enjoy?',
    };
  }
  if (context.topic) {
    return {
      topic: null,
      support: null,
      text: 'Thank you. Your description is kept in this conversation for this demo session. Is there anything else about eye discomfort, double vision, or everyday activities that you would like to add?',
    };
  }
  return {
    topic: null,
    support: null,
    text: 'Could you tell me more about eye discomfort, double vision, or how your eyes affect daily activities? I use a small set of scripted demo replies, so I may not understand every message. I can’t diagnose TED or mental-health conditions.',
  };
}
