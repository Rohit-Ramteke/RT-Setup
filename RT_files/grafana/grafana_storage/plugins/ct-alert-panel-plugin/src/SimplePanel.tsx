import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  // Get the last value of each field of type number, by adding the following to SimplePanel.tsx, before the return statement:

  const valueSeries = data.series.map(series => series.fields.find(field => field.type === 'number'));
  // .map(field => field?.values.get(field.values.length - 1) + 5);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <ol className="alert-rule-list">
        {valueSeries.map((series, index) => {
          const rule = {
            stateClass: 'alert-state-critical',
            alertstate: series && series.labels && series.labels.alertstate && series.labels.alertstate.toUpperCase(),
            // stateAge: 'for 6 hours',
            name: series && series.labels && series.labels.alertname,
            job: series && series.labels && series.labels.job,
            instance: series && series.labels && series.labels.instance,
            severity: series && series.labels && series.labels.severity && series.labels.severity.toUpperCase(),
          };
          return (
            <li className={'alert-rule-item'}>
              <div className="alert-rule-item__body">
                <div className="alert-rule-item__header">
                  <div className="alert-rule-item__name">{rule.name}</div>
                  <div className={cx(styles.alertRuleItemText)}>
                    <span className={cx(styles.labelText)}>State: </span>
                    <span className="alert-state-critical"> {rule.alertstate}</span>
                  </div>
                  <div className={cx(styles.alertRuleItemText)}>
                    <span className={cx(styles.labelText)}>Instance: </span>
                    <span className="alert-rule-item__time"> {rule.instance}</span>
                  </div>
                  <div className={cx(styles.alertRuleItemText)}>
                    <span className={cx(styles.labelText)}>Job: </span>
                    <span className="alert-rule-item__time"> {rule.job}</span>
                  </div>
                  <div className={cx(styles.alertRuleItemText)}>
                    <span className={cx(styles.labelText)}>Severity: </span>
                    <span className="alert-state-critical"> {rule.severity}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      overflow: auto;
    `,
    alertBox: css`
      border: 1px solid blue;
      margin: 10px 0;
      padding: 10px;
    `,
    labelText: css`
      color: #464c54;
    `,
    alertRuleItemText: css`
      font-weight: 500;
      font-size: 12px;
      margin: 0;
    `,
  };
});
