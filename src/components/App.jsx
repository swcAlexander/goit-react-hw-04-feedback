import React from 'react';
import { Section } from 'components/Section/Section.jsx';
import { Statistics } from 'components/Statistics/Statistics.jsx';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions.jsx';
import { Notification } from 'components/Notifications/Notifications';

export class App extends React.Component {
  static defaultProps = {
    goodInitialValue: 0,
    neutralInitialValue: 0,
    badInitialValue: 0,
  };

  static propTypes = {
    // тут описуємо пропи
  };
  // state = {
  //     value: this.props.initialValue,
  // }
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = state => {
    this.setState(prevState => ({ [state]: prevState[state] + 1 }));
  };
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return Math.round((good / total) * 100) || 0;
  };

  render() {
    const totalFeedback = this.countTotalFeedback();
    const totalPercentage = this.countPositiveFeedbackPercentage();
    const options = Object.keys(this.state);
    return (
      <div
        className="feedback"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            FeedbackOptions
            options={options}
            onLeaveFeedback={this.onLeaveFeedback}
          ></FeedbackOptions>
        </Section>
        {totalFeedback !== 0 ? (
          <Section title="Statistics">
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={totalFeedback}
              positivePercentage={totalPercentage}
            ></Statistics>
          </Section>
        ) : (
          <Section title="Statistics">
            <Notification></Notification>
          </Section>
        )}
      </div>
    );
  }
}
