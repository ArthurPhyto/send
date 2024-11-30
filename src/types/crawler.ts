export interface DomainCheck {
  domain: string;
  aRecord: boolean;
  mxRecord: boolean;
  nsRecord: boolean;
  isExpired: boolean;
  statusCode?: number;
  error?: string;
}

export interface CrawlJob {
  id: string;
  url: string;
  status: 'running' | 'completed' | 'error' | 'stopped';
  progress: number;
  crawledUrls: string[];
  externalLinks: Array<{
    url: string;
    statusCode: number;
  }>;
  expiredDomains: DomainCheck[];
  error?: string;
  startTime: Date;
  endTime?: Date;
}