'use client';

interface StatComparisonRowProps {
  label: string;
  homeValue: string | number;
  awayValue: string | number;
  homePercentage?: number;
}

export function StatComparisonRow({
  label,
  homeValue,
  awayValue,
  homePercentage,
}: StatComparisonRowProps) {
  const isNumeric =
    typeof homeValue === 'number' && typeof awayValue === 'number';
  const homeNum = typeof homeValue === 'number' ? homeValue : 0;
  const awayNum = typeof awayValue === 'number' ? awayValue : 0;
  const total = homeNum + awayNum;
  const percent = total > 0 ? (homeNum / total) * 100 : 50;

  return (
    <div className="py-3 border-b border-gray-700 last:border-b-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-gray-300 flex-1">
          {homeValue}
        </span>
        <span className="text-xs font-medium text-gray-500 px-3">{label}</span>
        <span className="text-sm font-semibold text-gray-300 flex-1 text-right">
          {awayValue}
        </span>
      </div>
      {isNumeric && (
        <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-red-500 h-full"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
    </div>
  );
}
