export class AlarmSeverity {
  constructor(readonly value: 'critical' | 'high' | 'medium' | 'low') {}
  equals(severity: AlarmSeverity) {
    return severity.value === severity.value;
  }
}
