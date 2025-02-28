import { Timeline } from "flowbite-react";
import { FcProcess } from "react-icons/fc";
import PropTypes from 'prop-types';

function TimeLine({ process, title, content }) {
  return (
    <>
      <Timeline horizontal>
        <Timeline.Item>
          <Timeline.Point icon={FcProcess} />
          <Timeline.Content>
            <Timeline.Time>{process}</Timeline.Time>
            <Timeline.Title>{title}</Timeline.Title>
            <Timeline.Body>{content}</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </>
  );
}
TimeLine.propTypes = {
  process: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default TimeLine;
