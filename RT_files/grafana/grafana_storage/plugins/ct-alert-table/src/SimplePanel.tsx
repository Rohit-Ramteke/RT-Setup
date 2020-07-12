import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { stylesFactory } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const styles = getStyles();

  // Get the last value of each field of type number, by adding the following to SimplePanel.tsx, before the return statement:

  console.log('data', data);

  const valueSeries = data.series.map(series => series.fields.find(field => field.type === 'number'));
  // .map(field => field?.values.get(field.values.length - 1));

  // console.log(valueSeries);

  const getOddClass = function(index: number) {
    if (index % 2) {
      return cx(styles.tableTrOdd);
    } else {
      return '';
    }
  };

  const secondsToHms = function(d: number) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    // var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    // var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    // var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';

    var hDisplay = h > 0 ? h + 'h ' : '';
    var mDisplay = m > 0 ? m + 'm ' : '';
    var sDisplay = s > 0 ? s + 's' : '';

    return hDisplay + mDisplay + sDisplay;
  };

  if (valueSeries.length) {
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
        <table className={cx(styles.table)}>
          <thead>
            <tr>
              <th className={cx(styles.tableTh)} scope="col">
                {'Alert'.toUpperCase()}
              </th>
              <th className={cx(styles.tableTh)} scope="col">
                {'State'.toUpperCase()}
              </th>
              <th className={cx(styles.tableTh)} scope="col">
                {'Instance'.toUpperCase()}
              </th>
              <th className={cx(styles.tableTh)} scope="col">
                {'Job'.toUpperCase()}
              </th>
              <th className={cx(styles.tableTh)} scope="col">
                {'Severity'.toUpperCase()}
              </th>
              <th className={cx(styles.tableTh, styles.activeSinceTh)} scope="col">
                {'Active Since'.toUpperCase()}
              </th>
            </tr>
          </thead>
          <tbody>
            {valueSeries.map((series, index) => {
              const rule = {
                stateClass: 'alert-state-critical',
                alertstate:
                  (series && series.labels && series.labels.alertstate && series.labels.alertstate.toUpperCase()) ||
                  '-',
                // stateAge: 'for 6 hours',
                name: (series && series.labels && series.labels.alertname) || '-',
                job: (series && series.labels && series.labels.job) || '-',
                instance: (series && series.labels && series.labels.instance) || '-',
                severity:
                  (series && series.labels && series.labels.severity && series.labels.severity.toUpperCase()) || '-',
                activeSince: secondsToHms(series && series?.values.get(series.values.length - 1)),
              };
              return (
                <tr className={getOddClass(index)}>
                  <th scope="row" className={cx(styles.tableTd)}>
                    {rule.name}
                  </th>
                  <td className={cx(styles.alertStateCritical, styles.tableTd)}>{rule.alertstate}</td>
                  <td className={cx(styles.tableTd)}>{rule.instance}</td>
                  <td className={cx(styles.tableTd)}>{rule.job}</td>
                  <td className={cx(styles.alertStateCritical, styles.tableTd)}>{rule.severity}</td>
                  <td className={cx(styles.tableTd)}>{rule.activeSince}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div className={cx(styles.alertMessage, styles.noAlertLightMessage)}>No Active Alerts</div>;
  }
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
      overflow: auto;
    `,
    table: css`
      width: 100%;
      margin-bottom: 1rem;
      color: #212529;
    `,
    tableTh: css`
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
      padding: 0.75rem;
      border-top: 1px solid #dee2e6;
    `,
    activeSinceTh: css`
      width: 125px;
    `,
    tableTd: css`
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    `,
    tableTrOdd: css`
      background-color: rgba(0, 0, 0, 0.05);
    `,
    alertStateCritical: css`
      color: #fa3a3a;
      font-weight: 500;
    `,
    alertMessage: css`
      position: relative;
      padding: 0.75rem 1.25rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: 0.25rem;
    `,
    noAlertLightMessage: css`
      color: #818182;
      background-color: #fefefe;
      border-color: #fdfdfe;
    `,
  };
});
