'use client';

interface ConfidenceBadgeProps {
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  size?: 'sm' | 'md' | 'lg';
}

export function ConfidenceBadge({
  confidence,
  riskLevel,
  size = 'md',
}: ConfidenceBadgeProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'high':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${getRiskColor(riskLevel)} ${sizeClasses[size]}`}
    >
      {confidence}%
    </span>
  );
}
