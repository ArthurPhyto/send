import { DomainCheck } from '../types/crawler';

export async function checkDomain(domain: string): Promise<DomainCheck> {
  const result: DomainCheck = {
    domain,
    aRecord: false,
    mxRecord: false,
    nsRecord: false,
    isExpired: false,
  };

  try {
    // Try to fetch the domain with HTTPS
    const httpsResponse = await fetch(`https://${domain}`, {
      method: 'HEAD',
      mode: 'no-cors',
    });
    
    if (httpsResponse.type === 'opaque') {
      // Domain exists but we can't access it due to CORS
      result.aRecord = true;
      return result;
    }
  } catch {
    try {
      // Try HTTP if HTTPS fails
      const httpResponse = await fetch(`http://${domain}`, {
        method: 'HEAD',
        mode: 'no-cors',
      });
      
      if (httpResponse.type === 'opaque') {
        result.aRecord = true;
        return result;
      }
    } catch {
      // Both HTTP and HTTPS failed
      result.aRecord = false;
    }
  }

  // If we couldn't connect at all, consider the domain potentially expired
  result.isExpired = !result.aRecord;
  return result;
}