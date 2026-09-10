import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { captureSteps } from '../demo';
import { EyeArtwork } from '../illustrations';
import { Badge, Body, Button, Card, colors, Icon, Notice, StepHeading, s } from '../ui';

export function Capture({
  next,
  step,
  setStep,
  retry,
  setRetry,
}: {
  next: () => void;
  step: number;
  setStep: (value: number) => void;
  retry: boolean;
  setRetry: (value: boolean) => void;
}) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'passed' | 'failed'>('idle');
  useEffect(() => {
    if (status !== 'checking') return;
    const timer = setTimeout(() => setStatus(retry ? 'failed' : 'passed'), 1000);
    return () => clearTimeout(timer);
  }, [status, retry]);
  const item = captureSteps[step];
  return (
    <View style={{ maxWidth: 720, width: '100%', alignSelf: 'center', gap: 18 }}>
      <StepHeading step={2} title="Guided capture" />
      <View style={{ gap: 9 }}>
        <Text
          accessibilityRole="header"
          style={{ fontSize: 28, color: colors.ink, fontWeight: '600', letterSpacing: -0.8 }}
        >
          {item.title}
        </Text>
        <Body>{item.note}</Body>
      </View>
      <View
        style={{ backgroundColor: '#173F39', borderRadius: 24, padding: 20, overflow: 'hidden' }}
      >
        <View style={s.row}>
          <Badge tint="#315B4F" color="#D9E9C8">
            SIMULATED CAMERA
          </Badge>
          <Text style={{ color: '#C7DBCE', fontSize: 11 }}>POSITION {step + 1} / 6</Text>
        </View>
        <View style={{ height: 310 }}>
          <EyeArtwork capture gaze={item.gaze} />
        </View>
        <View
          style={{
            alignSelf: 'center',
            padding: 12,
            backgroundColor: status === 'failed' ? '#775E33' : '#2E5C4C',
            borderRadius: 10,
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <Icon name={status === 'passed' ? 'check' : 'info'} color="#E0EDCE" size={17} />
          <Text style={{ color: '#E0EDCE', fontSize: 12 }}>
            {status === 'failed'
              ? 'Quality check failed — please retake'
              : status === 'checking'
                ? 'Checking alignment, lighting and clarity…'
                : status === 'passed'
                  ? 'Photo accepted · simulated quality check passed'
                  : 'Ready when you are · take a simulated photo'}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', gap: 6 }}>
        {captureSteps.map((c, i) => (
          <View
            key={c.gaze}
            style={{
              flex: 1,
              height: 5,
              borderRadius: 3,
              backgroundColor: i < step ? colors.teal : i === step ? '#A9CBAE' : colors.line,
            }}
          />
        ))}
      </View>
      <Card style={{ gap: 13, padding: 18 }}>
        <View style={s.row}>
          <Text style={{ fontSize: 13, color: colors.ink, fontWeight: '600' }}>
            One position at a time
          </Text>
          <Text style={s.small}>{step} of 6 completed</Text>
        </View>
        <Body style={{ fontSize: 12 }}>
          These prompts illustrate the experience. The clinical team will define the actual
          examination protocol.
        </Body>
      </Card>
      <Button
        secondary
        icon="eye"
        disabled={status === 'checking'}
        onPress={() => {
          setRetry(false);
          setStatus('checking');
        }}
      >
        {status === 'checking'
          ? 'Checking simulated photo…'
          : status === 'idle'
            ? 'Take simulated photo'
            : 'Retake simulated photo'}
      </Button>
      <Button
        disabled={status !== 'passed' || retry}
        onPress={() => {
          if (status !== 'passed' || retry) return;
          setStatus('idle');
          if (step < 5) setStep(step + 1);
          else next();
        }}
      >
        {step < 5 ? 'Next position' : 'Finish eye check'}
      </Button>
      <Text style={s.small}>
        Next becomes available only after this position’s simulated quality check passes.
      </Text>
      <View style={s.row}>
        {step > 0 ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setRetry(false);
              setStep(step - 1);
              setStatus('idle');
            }}
            style={{ padding: 10 }}
          >
            <Text style={{ color: colors.teal, fontSize: 12 }}>Previous position</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setRetry(true);
            setStatus('failed');
          }}
          style={{ padding: 10 }}
        >
          <Text style={{ color: colors.teal, fontSize: 12 }}>Preview a quality issue</Text>
        </Pressable>
      </View>
      <Notice>
        No camera is active. No images or measurements are collected. Capture quality and alignment
        feedback are simulated.
      </Notice>
    </View>
  );
}
