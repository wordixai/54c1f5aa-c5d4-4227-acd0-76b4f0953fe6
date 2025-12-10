interface StatusBadgeProps {
  status: 'idle' | 'active' | 'success' | 'error';
  label: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const statusConfig = {
    idle: {
      bg: 'bg-muted',
      text: 'text-muted-foreground',
      dot: 'bg-muted-foreground'
    },
    active: {
      bg: 'bg-primary/20',
      text: 'text-primary',
      dot: 'bg-primary animate-pulse-glow'
    },
    success: {
      bg: 'bg-accent/20',
      text: 'text-accent',
      dot: 'bg-accent'
    },
    error: {
      bg: 'bg-destructive/20',
      text: 'text-destructive',
      dot: 'bg-destructive'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bg}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className={`text-sm font-medium ${config.text}`}>{label}</span>
    </div>
  );
};

export default StatusBadge;
