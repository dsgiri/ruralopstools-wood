import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export const FULL_DISCLAIMER_TEXT = "Disclaimer: These figures are estimates based on standard assumptions and user inputs. This tool is for informational purposes only and does not replace professional financial, legal, engineering, or agricultural advice. We disclaim all liability for decisions, costs, losses, or damages arising from reliance on these results. Please consult qualified local professionals or certified advisors for guidance specific to your situation.";

export const SHORT_DISCLAIMER_TEXT = "Disclaimer: These figures are estimates. This tool does not replace professional advice. We disclaim all liability for damages arising from reliance on these results.";

interface CalculatorDisclaimerProps {
  customText?: string;
  className?: string;
}

export function CalculatorDisclaimer({ customText, className }: CalculatorDisclaimerProps) {
  return (
    <div className={cn("mt-6 p-4 bg-[#F2ECE4] border border-[#DCD3C7] rounded-sm flex items-start gap-3 text-xs text-[#6D5F52] leading-relaxed", className)}>
      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#8C7A6B]" aria-hidden="true" />
      <div>
        <strong className="font-bold text-[#5A4633] block mb-1">Important Notice</strong>
        <p>{customText || FULL_DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
}
