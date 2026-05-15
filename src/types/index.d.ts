export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
} & Required<Omit<TCommonProps, "name">>;

export type TTestimonial = {
  testimonial: string;
  designation: string;
  company: string;
  image: string;
} & Required<Pick<TCommonProps, "name">>;

export type TProject = {
  description: string;
  image: string;
  sourceCodeLink: string;
  liveSiteLink?: string;
  category?: string;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = Required<Omit<TCommonProps, "title">>;

export type TNavLink = {
  id: string;
} & Required<Pick<TCommonProps, "title">>;

export type TServiceIcon = "code" | "mentor" | "bot";

export type TService = {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  iconType: TServiceIcon;
  accentFrom: string;
  accentTo: string;
  tag: string;
};

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
