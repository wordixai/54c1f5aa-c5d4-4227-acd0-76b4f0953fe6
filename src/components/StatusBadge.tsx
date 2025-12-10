interface StatusBadgeProps {
  status: 'idle' | 'active' | 'success' | 'error';
  label: string;
}

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const statusConfig = {
    idle: {
      bg: 'bg-muted/50 border-border/50',
      text: 'text-muted-foreground',
      dot: 'bg-muted-foreground'
    },
    active: {
      bg: 'bg-primary/10 border-primary/30',
      text: 'text-primary',
      dot: 'bg-primary animate-pulse'
    },
    success: {
      bg: 'bg-accent/10 border-accent/30',
      text: 'text-accent',
      dot: 'bg-accent'
    },
    error: {
      bg: 'bg-destructive/10 border-destructive/30',
      text: 'text-destructive',
      dot: 'bg-destructive'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${config.bg}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot}`} style={{ boxShadow: status !== 'idle' ? '0 0 8px currentColor' : 'none' }} />
      <span className={`text-sm font-medium ${config.text}`}>{label}</span>
    </div>
  );
};

export default StatusBadge;
