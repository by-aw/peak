/** Inline SVGs of the revenue calculator (Framer code component, all 16x16). */

type IconProps = { className?: string };

/** "Booked Calls" row icon: smiley (white, on the blue chip). */
export function BookedCallsIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM11.0049 10.7451C10.712 10.4522 10.2372 10.4522 9.94434 10.7451C8.87048 11.8186 7.12952 11.8186 6.05566 10.7451C5.76277 10.4522 5.28801 10.4522 4.99512 10.7451C4.70228 11.038 4.70224 11.5128 4.99512 11.8057C6.65476 13.465 9.34524 13.465 11.0049 11.8057C11.2978 11.5128 11.2977 11.038 11.0049 10.7451ZM6 5C5.44772 5 5 5.67157 5 6.5C5 7.32843 5.44772 8 6 8C6.55228 8 7 7.32843 7 6.5C7 5.67157 6.55228 5 6 5ZM10 5C9.44771 5 9 5.67157 9 6.5C9 7.32843 9.44771 8 10 8C10.5523 8 11 7.32843 11 6.5C11 5.67157 10.5523 5 10 5Z" fill="white" /></svg>
  );
}

/** "Calls Taken" row icon: phone. */
export function CallsTakenIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M4.03516 2C4.52861 2 4.94824 2.36 5.02344 2.84766L5.46387 5.70605C5.52976 6.13512 5.31099 6.55761 4.92285 6.75195L3.85449 7.28613C4.5907 9.58902 6.41098 11.4093 8.71387 12.1455L9.24805 11.0771C9.44239 10.689 9.86488 10.4702 10.2939 10.5361L13.1523 10.9766C13.64 11.0518 14 11.4714 14 11.9648V13C14 13.5523 13.5523 14 13 14H11C10.2912 14 9.60051 13.9182 8.9375 13.7627C5.62257 12.9852 3.01479 10.3774 2.2373 7.0625C2.08181 6.39949 2 5.70879 2 5V3C2 2.44772 2.44772 2 3 2H4.03516Z" fill="white" /></svg>
  );
}

/** "Sales Made" row icon: price tag. */
export function SalesMadeIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M7.37891 2C8.04187 2.00006 8.6777 2.26363 9.14648 2.73242L13.6465 7.23242C14.6226 8.2087 14.6226 9.7913 13.6465 10.7676L10.7676 13.6465C9.7913 14.6226 8.2087 14.6226 7.23242 13.6465L2.73242 9.14648C2.26363 8.6777 2.00006 8.04187 2 7.37891V4.5C2 3.11929 3.11929 2 4.5 2H7.37891ZM5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4Z" fill="white" /></svg>
  );
}

/** "Total Cash" row icon: dollar coin. */
export function TotalCashIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1ZM8 3C7.58579 3 7.25 3.33579 7.25 3.75V4H6.375C5.06332 4 4 5.06332 4 6.375C4 7.68668 5.06332 8.75 6.375 8.75H7.25V10.5H4.75C4.33579 10.5 4 10.8358 4 11.25C4 11.6642 4.33579 12 4.75 12H7.25V12.25C7.25 12.6642 7.58579 13 8 13C8.41421 13 8.75 12.6642 8.75 12.25V12H9.625C10.9367 12 12 10.9367 12 9.625C12 8.31332 10.9367 7.25 9.625 7.25H8.75V5.5H11.25C11.6642 5.5 12 5.16421 12 4.75C12 4.33579 11.6642 4 11.25 4H8.75V3.75C8.75 3.33579 8.41421 3 8 3ZM9.625 8.75C10.1082 8.75 10.5 9.14175 10.5 9.625C10.5 10.1082 10.1082 10.5 9.625 10.5H8.75V8.75H9.625ZM7.25 7.25H6.375C5.89175 7.25 5.5 6.85825 5.5 6.375C5.5 5.89175 5.89175 5.5 6.375 5.5H7.25V7.25Z" fill="white" /></svg>
  );
}

/** Stepper "minus" glyph (#6D6D6D). */
export function MinusIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M12.25 7.25C12.6642 7.25 13 7.58579 13 8C13 8.41421 12.6642 8.75 12.25 8.75H3.75C3.33579 8.75 3 8.41421 3 8C3 7.58579 3.33579 7.25 3.75 7.25H12.25Z" fill="#6D6D6D" /></svg>
  );
}

/** Stepper "plus" glyph (#6D6D6D). */
export function PlusIcon({ className }: IconProps) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M8 3C8.41421 3 8.75 3.33579 8.75 3.75V7.25H12.25C12.6642 7.25 13 7.58579 13 8C13 8.41421 12.6642 8.75 12.25 8.75H8.75V12.25C8.75 12.6642 8.41421 13 8 13C7.58579 13 7.25 12.6642 7.25 12.25V8.75H3.75C3.33579 8.75 3 8.41421 3 8C3 7.58579 3.33579 7.25 3.75 7.25H7.25V3.75C7.25 3.33579 7.58579 3 8 3Z" fill="#6D6D6D" /></svg>
  );
}
