export interface FileScaffold {
  path: string;
  language: string;
  code: string;
}

export interface SystemModule {
  name: string;
  description: string;
  keyFiles: string[];
}

export interface GeneratedAppSchema {
  appName: string;
  description: string;
  techStack: string[];
  modules: SystemModule[];
  dbSchema: string;
  apiStructure: string;
  sampleCode: FileScaffold[];
  dockerConfig: string;
}

export interface BillingPlan {
  id: string;
  name: string;
  price: string;
  billing: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface UserSession {
  email: string;
  role: string;
  token: string;
  isActive: boolean;
}

export interface MetricPoint {
  time: string;
  cpu: number;
  memory: number;
  tokens: number;
  latency: number;
}
