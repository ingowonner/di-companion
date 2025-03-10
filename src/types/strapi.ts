import { CategoryEnum, PhaseEnum } from '@/utils/constants';

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  gender?: string;
  position?: string;
  bio?: string;
  linkedinProfile?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  givenName: string;
  familyName: string;
  gender?: string;
  position?: string;
  bio?: string;
  linkedinProfile?: string;
  startups: Startup[];
}

export interface StrapiAuthResponse {
  jwt: string;
  user: User;
}

export interface StrapiLoginCredentials {
  identifier: string;
  password: string;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export interface StrapiRelated {
  documentId: string;
}

export interface StrapiSetRelated {
  set: StrapiRelated;
}

export interface Pattern {
  documentId: string;
  patternId: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
  category: CategoryEnum;
  subcategory: string;
  phases: PhaseEnum[];
  relatedPatterns: Pattern[];
  exercise: StrapiRelated | null;
  survey: StrapiRelated | null;
}

export interface Exercise {
  documentId: string;
  name: string;
  description: string;
}

export enum QuestionType {
  radio = 'radio',
  select = 'select',
  select_multiple = 'select_multiple',
  checkbox = 'checkbox',
  text_short = 'text_short',
  text_long = 'text_long',
  email = 'email',
  number = 'number',
}

export interface QuestionOption {
  value: string;
  label: string;
  points?: number;
}

export interface Question {
  documentId: string;
  question: string;
  type: QuestionType;
  options: QuestionOption[] | null;
  isRequired: boolean;
  order: number;
  weight: number;
}

export interface Survey {
  documentId: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface Startup {
  documentId: string;
  name: string;
  startDate: string;
  foundersCount: number;
  background: string;
  productType: string;
  idea: string;
  industry: string;
  industryOther?: string;
  targetMarket: string;
  phase: string;
  isProblemValidated: boolean;
  qualifiedConversationsCount: number;
  isTargetGroupDefined: boolean;
  isPrototypeValidated: boolean;
  isMvpTested: boolean;
  scores?: Record<CategoryEnum, number>;
}

export interface CreateStartup {
  name: string;
  startDate: string;
  foundersCount: number;
  background: string;
  productType: string;
  idea: string;
  industry: string;
  industryOther?: string;
  targetMarket: string;
  phase: string;
  isProblemValidated: boolean;
  qualifiedConversationsCount: number;
  isTargetGroupDefined: boolean;
  isPrototypeValidated: boolean;
  isMvpTested: boolean;
  scores?: Record<CategoryEnum, number>;
}

export interface UpdateStartup {
  documentId: string;
  name?: string;
  startDate?: string;
  foundersCount?: number;
  background?: string;
  productType?: string;
  idea?: string;
  industry?: string;
  industryOther?: string;
  targetMarket?: string;
  phase?: string;
  isProblemValidated?: boolean;
  qualifiedConversationsCount?: number;
  isTargetGroupDefined?: boolean;
  isPrototypeValidated?: boolean;
  isMvpTested?: boolean;
  scores?: Record<CategoryEnum, number>;
}

/* Startup content */
export enum ResponseTypeEnum {
  accept = 'accept',
  reject = 'reject',
}

export enum ResponseEnum {
  share_reflection = 'share_reflection',
  perform_exercise = 'perform_exercise',
  think_later = 'think_later',
  already_addressed = 'already_addressed',
  maybe_later = 'maybe_later',
  no_value = 'no_value',
  dont_understand = 'dont_understand',
}

export interface StartupPattern {
  documentId: string;
  startup: Startup;
  pattern: Pattern;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  responseType: ResponseTypeEnum;
  response: ResponseEnum;
  points: number;
}

export interface CreateStartupPattern {
  startup: StrapiSetRelated;
  pattern: StrapiSetRelated;
  responseType: ResponseTypeEnum;
  response: ResponseEnum;
  completedAt?: string;
  points?: number;
}

export interface UpdateStartupPattern {
  documentId: string;
  startup?: StrapiSetRelated;
  pattern?: StrapiSetRelated;
  responseType?: ResponseTypeEnum;
  response?: ResponseEnum;
  completedAt?: string;
  points?: number;
}

export interface StartupExercise {
  documentId: string;
  id: string;
  startup: Startup;
  pattern: Pattern;
  exercise: Exercise;
  resultFiles: string[];
  resultText: string;
}

export interface CreateStartupExercise {
  startup: StrapiSetRelated;
  pattern: StrapiSetRelated;
  exercise: StrapiSetRelated;
  resultFiles: File[];
  resultText: string;
}

export interface UpdateStartupExercise {
  documentId: string;
  startup?: StrapiSetRelated;
  pattern?: StrapiSetRelated;
  exercise?: StrapiSetRelated;
  resultFiles?: File[];
  resultText?: string;
}

export interface StartupQuestion {
  documentId: string;
  startup: Startup;
  pattern: Pattern;
  question: Question;
  answer: string;
}

export interface CreateStartupQuestion {
  startup: StrapiSetRelated;
  pattern: StrapiSetRelated;
  question: StrapiSetRelated;
  answer: string;
}

export interface UpdateStartupQuestion {
  documentId: string;
  startup?: StrapiSetRelated;
  pattern?: StrapiSetRelated;
  question?: StrapiSetRelated;
  answer?: string;
}

export interface Recommendation {
  documentId: string;
  recommendation: string;
  type: 'pattern' | 'url' | 'file' | 'contact';
  text: string;
  isRead: boolean;
  publishedAt: string;
}

export interface StrapiSingleResponse<T> {
  data: T;
}
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
