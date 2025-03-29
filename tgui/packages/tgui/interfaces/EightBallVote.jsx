import { useBackend } from '../backend';
import { Box, Button, Stack, Section, NoticeBox } from 'tgui-core/components';
import { toTitleCase } from 'common/string';
import { Window } from '../layouts';

export const EightBallVote = (props) => {
  const { act, data } = useBackend();
  const { shaking } = data;
  return (
    <Window width={400} height={600}>
      <Window.Content>
        {(!shaking && (
          <NoticeBox>No question is currently being asked.</NoticeBox>
        )) || <EightBallVoteQuestion />}
      </Window.Content>
    </Window>
  );
};

const EightBallVoteQuestion = (props) => {
  const { act, data } = useBackend();
  const { question, answers = [] } = data;
  return (
    <Section>
      <Box bold textAlign="center" fontSize="16px" m={1}>
        &quot;{question}&quot;
      </Box>
      <Stack>
        {answers.map((answer) => (
          <Stack.Item key={answer.answer}>
            <Button
              fluid
              bold
              content={toTitleCase(answer.answer)}
              selected={answer.selected}
              fontSize="16px"
              lineHeight="24px"
              textAlign="center"
              mb={1}
              onClick={() =>
                act('vote', {
                  answer: answer.answer,
                })
              }
            />
            <Box bold textAlign="center" fontSize="30px">
              {answer.amount}
            </Box>
          </Stack.Item>
        ))}
      </Stack>
    </Section>
  );
};
