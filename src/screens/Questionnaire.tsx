import { Pressable, Text, View } from 'react-native';
import { Answers, questions } from '../demo';
import { Body, Button, Card, colors, Icon, StepHeading, s } from '../ui';

export function Questionnaire({
  answers,
  answer,
  next,
}: {
  answers: Answers;
  answer: (id: string, value: string) => void;
  next: () => void;
}) {
  const current = questions.find((q) => !answers[q.id]);
  return (
    <View style={{ maxWidth: 730, width: '100%', alignSelf: 'center', gap: 20 }}>
      <StepHeading step={1} title="Your symptoms" />
      <Text
        accessibilityRole="header"
        style={{ fontSize: 27, color: colors.ink, fontWeight: '600' }}
      >
        How have your eyes been?
      </Text>
      <Body>
        A few structured questions for your eye-check report. For a more open conversation, visit
        the Chat tab anytime.
      </Body>
      {questions
        .filter((q) => answers[q.id])
        .map((q) => (
          <Card key={q.id} style={{ gap: 8, padding: 18 }}>
            <Text style={s.small}>{q.title}</Text>
            <View style={s.row}>
              <Text style={{ color: colors.ink, flex: 1, fontSize: 14 }}>{answers[q.id]}</Text>
              <Icon name="check" size={18} />
            </View>
          </Card>
        ))}
      {current ? (
        <Card style={{ gap: 17 }}>
          <Text style={s.label}>QUESTION {questions.indexOf(current) + 1} OF 4</Text>
          <Text style={{ fontSize: 20, lineHeight: 28, fontWeight: '500', color: colors.ink }}>
            {current.title}
          </Text>
          <Body>{current.subtitle}</Body>
          {current.options.map((option) => (
            <Pressable
              key={option}
              accessibilityRole="button"
              onPress={() => answer(current.id, option)}
              style={({ pressed }) => ({
                padding: 16,
                borderWidth: 1,
                borderColor: colors.line,
                borderRadius: 12,
                backgroundColor: pressed ? colors.mint : colors.cream,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              })}
            >
              <Text style={{ color: colors.ink, fontSize: 14, flex: 1 }}>{option}</Text>
              <Icon name="plus" size={17} />
            </Pressable>
          ))}
        </Card>
      ) : (
        <Button onPress={next}>Continue to guided capture</Button>
      )}
    </View>
  );
}
