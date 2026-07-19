import type { SVGProps } from "react";

/** Microsoft Azure — official mark (extracted from the Azure brand SVG). */
export function AzureLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 242" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="azureLogoA" x1="58.972%" x2="37.191%" y1="7.411%" y2="103.762%">
          <stop offset="0%" stopColor="#114a8b" />
          <stop offset="100%" stopColor="#0669bc" />
        </linearGradient>
        <linearGradient id="azureLogoB" x1="59.719%" x2="52.691%" y1="52.313%" y2="54.864%">
          <stop offset="0%" stopOpacity=".3" />
          <stop offset="7.1%" stopOpacity=".2" />
          <stop offset="32.1%" stopOpacity=".1" />
          <stop offset="62.3%" stopOpacity=".05" />
          <stop offset="100%" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="azureLogoC" x1="37.279%" x2="62.473%" y1="4.6%" y2="99.979%">
          <stop offset="0%" stopColor="#3ccbf4" />
          <stop offset="100%" stopColor="#2892df" />
        </linearGradient>
      </defs>
      <path
        fill="url(#azureLogoA)"
        d="M85.343.003h75.753L82.457 233a12.08 12.08 0 0 1-11.442 8.216H12.06A12.06 12.06 0 0 1 .633 225.303L73.898 8.219A12.08 12.08 0 0 1 85.343 0z"
      />
      <path
        fill="#0078d4"
        d="M195.423 156.282H75.297a5.56 5.56 0 0 0-3.796 9.627l77.19 72.047a12.14 12.14 0 0 0 8.28 3.26h68.02z"
      />
      <path
        fill="url(#azureLogoB)"
        d="M85.343.003a11.98 11.98 0 0 0-11.471 8.376L.723 225.105a12.045 12.045 0 0 0 11.37 16.112h60.475a12.93 12.93 0 0 0 9.921-8.437l14.588-42.991l52.105 48.6a12.33 12.33 0 0 0 7.757 2.828h67.766l-29.721-84.935l-86.643.02L161.37.003z"
      />
      <path
        fill="url(#azureLogoC)"
        d="M182.098 8.207A12.06 12.06 0 0 0 170.67.003H86.245c5.175 0 9.773 3.301 11.428 8.204L170.94 225.3a12.062 12.062 0 0 1-11.428 15.92h84.429a12.062 12.062 0 0 0 11.425-15.92z"
      />
    </svg>
  );
}

/** Google Cloud — official mark (extracted from the Google Cloud brand SVG). */
export function GoogleCloudLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 206" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="#ea4335"
        d="m170.252 56.819l22.253-22.253l1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92C42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123l44.505-7.34l3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168z"
      />
      <path
        fill="#4285f4"
        d="M224.205 73.918a100.25 100.25 0 0 0-30.217-48.722l-31.232 31.232a55.52 55.52 0 0 1 20.379 44.037v5.544c15.35 0 27.797 12.445 27.797 27.796c0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.67c39.93.311 72.553-31.494 72.864-71.424a72.3 72.3 0 0 0-31.793-60.453"
      />
      <path
        fill="#34a853"
        d="M71.87 205.796h55.593V161.29H71.87a27.3 27.3 0 0 1-11.399-2.498l-7.887 2.42l-22.409 22.253l-1.952 7.574c12.567 9.489 27.9 14.825 43.647 14.757"
      />
      <path
        fill="#fbbc05"
        d="M71.87 61.426C31.94 61.663-.237 94.227.001 134.158a72.3 72.3 0 0 0 28.222 56.88l32.248-32.246c-13.99-6.322-20.208-22.786-13.887-36.776s22.786-20.208 36.775-13.888a27.8 27.8 0 0 1 13.887 13.888l32.248-32.248A72.22 72.22 0 0 0 71.87 61.427"
      />
    </svg>
  );
}

/** AWS "Smile" mark — orange badge, white wordmark and swoosh, matching the
 * official badge treatment (the plain "aws" wordmark logo isn't this shape,
 * so the circle + text + arc is authored to reproduce the badge variant). */
export function AwsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <marker
          id="awsSmileArrow"
          markerWidth="8"
          markerHeight="8"
          refX="4"
          refY="4"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="white" />
        </marker>
      </defs>
      <circle cx="128" cy="128" r="126" fill="#FF9900" />
      <text
        x="128"
        y="102"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="68"
        fill="white"
      >
        aws
      </text>
      <path
        d="M70,158 Q128,192 184,158"
        fill="none"
        stroke="white"
        strokeWidth="11"
        strokeLinecap="round"
        markerEnd="url(#awsSmileArrow)"
      />
    </svg>
  );
}
