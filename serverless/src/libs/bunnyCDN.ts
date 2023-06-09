import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type BunnyCdnErrorOptions = {
  name: string;
  message: string;
};

export class BunnyCdnError extends Error {
  public name: string;

  constructor({ name, message }: BunnyCdnErrorOptions) {
    super(message);

    this.name = name;
    this.message = message;
  }
}
const BUNNY_CDN_API_URL = 'https://api.bunny.net';

export class BunnyCdn {
  constructor(private accessKey: string) {}

  private enforceHttps = (url: string) => {
    if (url.startsWith('https://')) {
      return url;
    }

    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }

    return `https://${url}`;
  };

  private fetchBunny = async (endpoint: string, init: AxiosRequestConfig) => {
    const headers = {
      AccessKey: this.accessKey,
    };

    const response = await axios.request({
      url: `${BUNNY_CDN_API_URL}${endpoint}`,
      method: 'POST',
      headers,
      validateStatus: (status) => status < 500,
      timeout: 20_000,
      ...init,
    });
    const data = response.data;

    if (data.ErrorKey || data.Message) {
      throw new BunnyCdnError({ name: data.ErrorKey, message: data.Message });
    }

    return data;
  };

  public async getPullZone(options: GetPullZoneMethodArgs) {
    const data = (await this.fetchBunny(`/pullzone/${options.pullZoneId}`, {
      method: 'GET',
    })) as PullZoneData;

    return {
      id: data.Id,
      name: data.Name,
      originUrl: data.OriginUrl,
      hostnames: data.Hostnames,
    };
  }

  public async createPullZone(options: CreatePullZoneMethodArgs) {
    const httpsOriginUrl = this.enforceHttps(options.originUrl);

    const data = (await this.fetchBunny(`/pullzone`, {
      data: {
        Name: options.zoneId,
        Type: 0,
        OriginUrl: httpsOriginUrl,
        UseStaleWhileOffline: true,
      },
    })) as PullZoneData;

    const systemHostname: HostnameInterface[] = data.Hostnames.filter(
      (hostname) => hostname.IsSystemHostname === true
    );

    return {
      id: data.Id,
      name: data.Name,
      originUrl: data.OriginUrl,
      hostname: systemHostname[0].Value,
    };
  }

  public async updatePullZone(options: UpdatePullZoneMethodArgs) {
    const httpsOriginUrl = this.enforceHttps(options.originUrl);

    await this.fetchBunny(`/pullzone/${options.pullZoneId}`, {
      data: {
        OriginUrl: httpsOriginUrl,
      },
    });

    return true;
  }

  public async deletePullZone(options: DeletePullZoneMethodArgs) {
    await this.fetchBunny(`/pullzone/${options.pullZoneId}`, {
      method: 'DELETE',
    });

    return true;
  }

  public async addCustomHostname(options: AddCustomHostnameMethodArgs) {
    await this.fetchBunny(`/pullzone/${options.pullZoneId}/addHostname`, {
      data: {
        Hostname: options.hostname,
      },
    });

    return true;
  }

  public async removeCustomHostname(options: AddCustomHostnameMethodArgs) {
    await this.fetchBunny(`/pullzone/${options.pullZoneId}/removeHostname`, {
      method: 'DELETE',
      data: {
        Hostname: options.hostname,
      },
    });

    return true;
  }

  public async loadFreeCertificate(options: LoadFreeCertificateMethodArgs) {
    await this.fetchBunny(
      `/pullzone/loadFreeCertificate?hostname=${options.hostname}`,
      {
        method: 'GET',
      }
    );

    return true;
  }

  public async setForceSSL(options: SetForceSSLMethodArgs) {
    await this.fetchBunny(`/pullzone/${options.pullZoneId}/setForceSSL`, {
      data: {
        Hostname: options.hostname,
        ForceSSL: options.shouldForceSSL ?? true,
      },
    });

    return true;
  }

  public async purgePullZoneCache(options: PurgePullZoneCacheMethodArgs) {
    await this.fetchBunny(`/pullzone/${options.pullZoneId}/purgeCache`, {});

    return true;
  }
}

export type ErrorData = {
  ErrorKey: string;
  Field: string;
  Message: string;
};

export type GetPullZoneMethodArgs = {
  pullZoneId: string;
};

export type CreatePullZoneMethodArgs = {
  zoneId: string;
  originUrl: string;
};

export type UpdatePullZoneMethodArgs = {
  pullZoneId: string;
  originUrl: string;
};

export type DeletePullZoneMethodArgs = {
  pullZoneId: string;
};

export type AddCustomHostnameMethodArgs = {
  pullZoneId: string;
  hostname: string;
};

export type LoadFreeCertificateMethodArgs = {
  hostname: string;
};

export type RemoveCustomHostnameMethodArgs = {
  pullZoneId: string;
  hostname: string;
};

export type SetForceSSLMethodArgs = {
  pullZoneId: string;
  hostname: string;
  shouldForceSSL?: boolean;
};

export type PurgePullZoneCacheMethodArgs = {
  pullZoneId: string;
};

type HostnameInterface = {
  /** The unique ID of the hostname */
  Id: number;
  /** The hostname value for the domain name */
  Value: string;
  /** Determines if the Force SSL feature is enabled */
  ForceSSL: string;
  /** Determines if this is a system hostname controlled by bunny.net */
  IsSystemHostname: boolean;
  /** Determines if the hostname has an SSL certificate configured */
  HasCertificate: true;
};

type PullZoneData = {
  Id: number;
  Name: string;
  OriginUrl: string;
  Hostnames: HostnameInterface[];
};

export type FetchPullZoneArgs = {
  name: string;
};

export const fetchPullZone = async ({ name }: FetchPullZoneArgs) => {
  const hostname = `https://${name}.b-cdn.net`;

  const response = await axios.head(hostname, { timeout: 20_000 });

  if (response.headers['cdn-pullzone']) {
    return { hostname, id: response.headers['cdn-pullzone'] };
  }
};
