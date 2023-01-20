import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('FleekERC721', () => {
  const ROLES = Object.freeze({
    OWNER: 0,
    CONTROLLER: 1,
  });

  const MINT_PARAMS = Object.freeze({
    name: 'Fleek Test App',
    description: 'Fleek Test App Description',
    ens: 'fleek.eth',
    externalUrl: 'https://fleek.co',
    commitHash: 'b72e47171746b6a9e29b801af9cb655ecf4d665c',
    gitRepository: 'https://github.com/fleekxyz/non-fungible-apps',
    logo: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMTgzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjQgMTQxLjUzMTk5OTk5OTk5OTk4Ij48cGF0aCBkPSJNMTAuMzgzIDEyNi44OTRMMCAwbDEyNCAuMjU1LTEwLjk3OSAxMjYuNjM5LTUwLjU1MyAxNC42Mzh6IiBmaWxsPSIjZTM0ZjI2Ii8+PHBhdGggZD0iTTYyLjQ2OCAxMjkuMjc3VjEyLjA4NWw1MS4wNjQuMTctOS4xMDYgMTA0Ljg1MXoiIGZpbGw9IiNlZjY1MmEiLz48cGF0aCBkPSJNOTkuNDkgNDEuMzYybDEuNDQ2LTE1LjQ5SDIyLjM4M2w0LjM0IDQ3LjQ5aDU0LjIxM0w3OC44MSA5My42MTdsLTE3LjM2MiA0LjY4LTE3LjYxNy01LjEwNi0uOTM2LTEyLjA4NUgyNy4zMTlsMi4xMjggMjQuNjgxIDMyIDguOTM2IDMyLjI1NS04LjkzNiA0LjM0LTQ4LjE3SDQxLjEwN0wzOS40OSA0MS4zNjJ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
    color: 0xe34f26,
  });

  const COLLECTION_PARAMS = Object.freeze({
    name: 'FleekERC721',
    symbol: 'FLEEK',
  });

  const defaultFixture = async () => {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory('FleekERC721');
    const contract = await upgrades.deployProxy(Contract, [
      COLLECTION_PARAMS.name,
      COLLECTION_PARAMS.symbol,
    ]);

    return { owner, otherAccount, contract };
  };

  describe('Deployment', () => {
    it('should assign the name and the symbol of the ERC721 contract', async () => {
      const { contract } = await loadFixture(defaultFixture);

      expect(await contract.name()).to.equal(COLLECTION_PARAMS.name);
      expect(await contract.symbol()).to.equal(COLLECTION_PARAMS.symbol);
    });

    it('should support ERC721 interface', async () => {
      const { contract } = await loadFixture(defaultFixture);

      expect(await contract.supportsInterface('0x80ac58cd')).to.equal(true);
    });
  });

  describe('Minting', () => {
    it('should be able to mint a new token', async () => {
      const { owner, contract } = await loadFixture(defaultFixture);

      const response = await contract.mint(
        owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.logo,
        MINT_PARAMS.color
      );

      expect(response.value).to.be.instanceOf(ethers.BigNumber);
      expect(response.value.toNumber()).to.equal(0);
    });

    it('should not be able to mint a new token if not the owner', async () => {
      const { otherAccount, contract } = await loadFixture(defaultFixture);

      await expect(
        contract
          .connect(otherAccount)
          .mint(
            otherAccount.address,
            MINT_PARAMS.name,
            MINT_PARAMS.description,
            MINT_PARAMS.externalUrl,
            MINT_PARAMS.ens,
            MINT_PARAMS.commitHash,
            MINT_PARAMS.gitRepository,
            MINT_PARAMS.logo,
            MINT_PARAMS.color
          )
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should have address to as owner', async () => {
      const { owner, otherAccount, contract } = await loadFixture(
        defaultFixture
      );

      const response = await contract.mint(
        owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.logo,
        MINT_PARAMS.color
      );

      const tokenId = response.value.toNumber();

      expect(await contract.ownerOf(tokenId)).to.equal(owner.address);
      expect(await contract.hasTokenRole(tokenId, ROLES.OWNER, owner.address))
        .to.be.true;

      expect(await contract.ownerOf(tokenId)).not.to.equal(
        otherAccount.address
      );
      expect(
        await contract.hasTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.false;
    });
  });

  describe('Token URI', () => {
    let tokenId: number;
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    before(async () => {
      fixture = await loadFixture(defaultFixture);
      const { contract } = fixture;

      const response = await contract.mint(
        fixture.owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.logo,
        MINT_PARAMS.color
      );

      tokenId = response.value.toNumber();
    });

    it('should return the token URI', async () => {
      const { contract } = fixture;
      const tokenURI = await contract.tokenURI(tokenId);

      const tokenURIDecoded = Buffer.from(
        tokenURI.replace('data:application/json;base64,', ''),
        'base64'
      ).toString('ascii');

      const parsedURI = JSON.parse(tokenURIDecoded);

      expect(parsedURI).to.eql({
        owner: fixture.owner.address.toLowerCase(),
        name: MINT_PARAMS.name,
        description: MINT_PARAMS.description,
        image:
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODc4IiBoZWlnaHQ9IjkxOCIgdmlld0JveD0iMCAwIDg3OCA5MTgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj5AaW1wb3J0IHVybCgiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDUwMDs2MDAiKTs8L3N0eWxlPjxwYXRoIGQ9Ik04NzYgMTI5LjVWMTI3LjVIODc0SDg1Ny41Vjc5SDg3NEg4NzZWNzdWNjguMjc4NkM4NzYgNjEuODEwNiA4NzMuNTg5IDU1LjU3NDkgODY5LjIzOCA1MC43ODkxTDgzMi42MjIgMTAuNTEwNUM4MjcuNjk0IDUuMDkwMTcgODIwLjcwOCAyIDgxMy4zODMgMkg3MzcuOTQ3QzcyOC44OTcgMiA3MjAuNDk4IDYuNzA1NzkgNzE1Ljc3MyAxNC40MjRMNzEwLjEzNSAyMy42MzI5QzcwOS4wNDQgMjUuNDE0IDcwNy4xMDYgMjYuNSA3MDUuMDE4IDI2LjVINjgySDY4MFYxMVY5SDY3OEg5OUg5N1YxMUM5NyA2LjAyOTQ0IDkyLjk3MDYgMiA4OCAySDI4QzEzLjY0MDYgMiAyIDEzLjY0MDYgMiAyOFY4OTBDMiA5MDQuMzU5IDEzLjY0MDYgOTE2IDI4IDkxNkg4NTBDODY0LjM1OSA5MTYgODc2IDkwNC4zNTkgODc2IDg5MFYxMjkuNVoiIGZpbGw9IiMxMzEzMTYiIC8+PHBhdGggZD0iTTg3NiAxMjkuNVYxMjcuNUg4NzRIODU3LjVWNzlIODc0SDg3NlY3N1Y2OC4yNzg2Qzg3NiA2MS44MTA2IDg3My41ODkgNTUuNTc0OSA4NjkuMjM4IDUwLjc4OTFMODMyLjYyMiAxMC41MTA1QzgyNy42OTQgNS4wOTAxNyA4MjAuNzA4IDIgODEzLjM4MyAySDczNy45NDdDNzI4Ljg5NyAyIDcyMC40OTggNi43MDU3OSA3MTUuNzczIDE0LjQyNEw3MTAuMTM1IDIzLjYzMjlDNzA5LjA0NCAyNS40MTQgNzA3LjEwNiAyNi41IDcwNS4wMTggMjYuNUg2ODJINjgwVjExVjlINjc4SDk5SDk3VjExQzk3IDYuMDI5NDQgOTIuOTcwNiAyIDg4IDJIMjhDMTMuNjQwNiAyIDIgMTMuNjQwNiAyIDI4Vjg5MEMyIDkwNC4zNTkgMTMuNjQwNiA5MTYgMjggOTE2SDg1MEM4NjQuMzU5IDkxNiA4NzYgOTA0LjM1OSA4NzYgODkwVjEyOS41WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzEzXzMzKSIgc3Ryb2tlPSJ1cmwoI21haW4pIiBzdHJva2Utd2lkdGg9IjQiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PHBhdGggZD0iTTc4MyA5MTZINzg1VjkxNFY0MjRDNzg1IDQxMC43NDUgNzc0LjI1NSA0MDAgNzYxIDQwMEgxMTdDMTAzLjc0NSA0MDAgOTMgNDEwLjc0NSA5MyA0MjRWOTE0VjkxNkg5NUg3ODNaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjE0IiBzdHJva2U9InVybCgjbWFpbikiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik02NS4zMjU4IDY0LjVDNjYuMDgyNSA2NC41IDY2LjU2NSA2My42OTIxIDY2LjIwNjMgNjMuMDI1OUw1MC4zODA1IDMzLjYzNTJDNTAuMDAyOSAzMi45MzQgNDguOTk3MSAzMi45MzQgNDguNjE5NSAzMy42MzUyTDMyLjc5MzcgNjMuMDI1OUMzMi40MzUgNjMuNjkyMSAzMi45MTc1IDY0LjUgMzMuNjc0MiA2NC41SDQxQzQxLjU1MjMgNjQuNSA0MiA2NC45NDc3IDQyIDY1LjVWODZDNDIgODYuNTUyMyA0Mi40NDc3IDg3IDQzIDg3SDU2QzU2LjU1MjMgODcgNTcgODYuNTUyMyA1NyA4NlY2NS41QzU3IDY0Ljk0NzcgNTcuNDQ3NyA2NC41IDU4IDY0LjVINjUuMzI1OFoiIGZpbGw9InVybCgjbWFpbikiLz48cGF0aCBkPSJNNjUuMzI1OCAxNTEuNUM2Ni4wODI1IDE1MS41IDY2LjU2NSAxNTAuNjkyIDY2LjIwNjMgMTUwLjAyNkw1MC4zODA1IDEyMC42MzVDNTAuMDAyOSAxMTkuOTM0IDQ4Ljk5NzEgMTE5LjkzNCA0OC42MTk1IDEyMC42MzVMMzIuNzkzNyAxNTAuMDI2QzMyLjQzNSAxNTAuNjkyIDMyLjkxNzUgMTUxLjUgMzMuNjc0MiAxNTEuNUg0MUM0MS41NTIzIDE1MS41IDQyIDE1MS45NDggNDIgMTUyLjVWMTczQzQyIDE3My41NTIgNDIuNDQ3NyAxNzQgNDMgMTc0SDU2QzU2LjU1MjMgMTc0IDU3IDE3My41NTIgNTcgMTczVjE1Mi41QzU3IDE1MS45NDggNTcuNDQ3NyAxNTEuNSA1OCAxNTEuNUg2NS4zMjU4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC41Ii8+PHBhdGggZD0iTTY1LjMyNTggMjM4LjVDNjYuMDgyNSAyMzguNSA2Ni41NjUgMjM3LjY5MiA2Ni4yMDYzIDIzNy4wMjZMNTAuMzgwNSAyMDcuNjM1QzUwLjAwMjkgMjA2LjkzNCA0OC45OTcxIDIwNi45MzQgNDguNjE5NSAyMDcuNjM1TDMyLjc5MzcgMjM3LjAyNkMzMi40MzUgMjM3LjY5MiAzMi45MTc1IDIzOC41IDMzLjY3NDIgMjM4LjVINDFDNDEuNTUyMyAyMzguNSA0MiAyMzguOTQ4IDQyIDIzOS41VjI2MEM0MiAyNjAuNTUyIDQyLjQ0NzcgMjYxIDQzIDI2MUg1NkM1Ni41NTIzIDI2MSA1NyAyNjAuNTUyIDU3IDI2MFYyMzkuNUM1NyAyMzguOTQ4IDU3LjQ0NzcgMjM4LjUgNTggMjM4LjVINjUuMzI1OFoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjgyIDdIMjI1VjI5OUMyMjUgMzEyLjI1NSAyMzUuNzQ1IDMyMyAyNDkgMzIzSDY1OEM2NzEuMjU1IDMyMyA2ODIgMzEyLjI1NSA2ODIgMjk5VjdaTTUxNCA0NC45NjA5QzUwNy4zNzMgNDQuOTYwOSA1MDIgNTAuMzMzNSA1MDIgNTYuOTYwOVYyODQuMzI1QzUwMiAyOTAuOTUyIDUwNy4zNzMgMjk2LjMyNSA1MTQgMjk2LjMyNUg2MTBDNjE2LjYyNyAyOTYuMzI1IDYyMiAyOTAuOTUyIDYyMiAyODQuMzI1VjU2Ljk2MDlDNjIyIDUwLjMzMzUgNjE2LjYyNyA0NC45NjA5IDYxMCA0NC45NjA5SDUxNFoiIGZpbGw9InVybCgjbWFpbikiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTgwMS44MDUgNTQuMTk4NEM4MDIuNDE3IDUzLjYyNiA4MDMuMzQ2IDU0LjQwNjUgODAyLjg2OCA1NS4wOTA4TDc4MS40ODkgODUuNjkxOEM3ODEuMTUyIDg2LjE3MzQgNzgxLjUzNyA4Ni44MjI5IDc4Mi4xMjkgODYuNzcyTDc5NC42OTcgODUuNjlDNzk1LjMyMiA4NS42MzYxIDc5NS43IDg2LjM1NiA3OTUuMjkyIDg2LjgyNjdMNzczLjcyMyAxMTEuNzU4Qzc3My4zMTYgMTEyLjIyOCA3NzMuNjkzIDExMi45NDggNzc0LjMxOSAxMTIuODk0TDc4Ny44NTIgMTExLjcyOUM3ODguNTE0IDExMS42NzIgNzg4Ljg3OSAxMTIuNDY4IDc4OC4zOTggMTEyLjkxOUw3MzYuMTk1IDE2MS44MDJDNzM1LjU4MyAxNjIuMzc0IDczNC42NTQgMTYxLjU5MyA3MzUuMTMyIDE2MC45MDlMNzU2Ljc5MiAxMjkuOTA1Qzc1Ny4xMjkgMTI5LjQyNCA3NTYuNzQ0IDEyOC43NzQgNzU2LjE1MiAxMjguODI1TDc0My4zMTYgMTI5LjkzQzc0Mi42OTIgMTI5Ljk4NCA3NDIuMzE0IDEyOS4yNjkgNzQyLjcxNyAxMjguNzk3TDc2My42NTIgMTA0LjI5M0M3NjQuMDU1IDEwMy44MjEgNzYzLjY3NyAxMDMuMTA1IDc2My4wNTMgMTAzLjE1OUw3NTAuMTQ4IDEwNC4yN0M3NDkuNDg2IDEwNC4zMjcgNzQ5LjEyMSAxMDMuNTMyIDc0OS42MDMgMTAzLjA4MUw4MDEuODA1IDU0LjE5ODRaIiBmaWxsPSJ3aGl0ZSIvPjxpbWFnZSB4PSIzMzkiIHk9IjQ3NiIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNKdWIyNWxJaUJvWldsbmFIUTlJakkxTURBaUlIZHBaSFJvUFNJeU1UZ3pJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBeE1qUWdNVFF4TGpVek1UazVPVGs1T1RrNU9UazRJajQ4Y0dGMGFDQmtQU0pOTVRBdU16Z3pJREV5Tmk0NE9UUk1NQ0F3YkRFeU5DQXVNalUxTFRFd0xqazNPU0F4TWpZdU5qTTVMVFV3TGpVMU15QXhOQzQyTXpoNklpQm1hV3hzUFNJalpUTTBaakkySWk4K1BIQmhkR2dnWkQwaVRUWXlMalEyT0NBeE1qa3VNamMzVmpFeUxqQTROV3cxTVM0d05qUXVNVGN0T1M0eE1EWWdNVEEwTGpnMU1Yb2lJR1pwYkd3OUlpTmxaalkxTW1FaUx6NDhjR0YwYUNCa1BTSk5PVGt1TkRrZ05ERXVNell5YkRFdU5EUTJMVEUxTGpRNVNESXlMak00TTJ3MExqTTBJRFEzTGpRNWFEVTBMakl4TTB3M09DNDRNU0E1TXk0Mk1UZHNMVEUzTGpNMk1pQTBMalk0TFRFM0xqWXhOeTAxTGpFd05pMHVPVE0yTFRFeUxqQTROVWd5Tnk0ek1UbHNNaTR4TWpnZ01qUXVOamd4SURNeUlEZ3VPVE0ySURNeUxqSTFOUzA0TGprek5pQTBMak0wTFRRNExqRTNTRFF4TGpFd04wd3pPUzQwT1NBME1TNHpOako2SWlCbWFXeHNQU0lqWm1abUlpOCtQQzl6ZG1jKyIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0ibWFpbiI+PHN0b3Agc3RvcC1jb2xvcj0iI2UzNGYyNiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDBfbGluZWFyXzEzXzMzIiB4MT0iNCIgeTE9IjkxNCIgeDI9Ijg3NCIgeTI9IjMuOTk5OTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMUQxRTI1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTM0ZjI2Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgeD0iMTM3IiB5PSI3OTAiIGZvbnQtc2l6ZT0iNTYiIGZpbGw9IiNFNUU3RjgiPkZsZWVrIFRlc3QgQXBwPC90ZXh0Pjx0ZXh0IGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgeD0iMTM3IiB5PSI4NDYiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IiM3RjgxOTIiPmZsZWVrLmV0aDwvdGV4dD48L3N2Zz4=',
        external_url: MINT_PARAMS.externalUrl,
        attributes: [
          {
            trait_type: 'ENS',
            value: MINT_PARAMS.ens,
          },
          {
            trait_type: 'Commit Hash',
            value: MINT_PARAMS.commitHash,
          },
          {
            trait_type: 'Repository',
            value: MINT_PARAMS.gitRepository,
          },
          {
            trait_type: 'Version',
            value: '0',
          },
          {
            trait_type: 'Color',
            value: `#${MINT_PARAMS.color.toString(16)}`,
          },
        ],
      });
    });
  });

  describe('Token Roles', () => {
    let tokenId: number;
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    beforeEach(async () => {
      fixture = await loadFixture(defaultFixture);
      const { contract } = fixture;

      const response = await contract.mint(
        fixture.owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.logo,
        MINT_PARAMS.color
      );

      tokenId = response.value.toNumber();
    });

    it('should match the token owner', async () => {
      const { contract, owner } = fixture;
      const tokenOwner = await contract.ownerOf(tokenId);
      expect(tokenOwner).to.equal(owner.address);
    });

    it('should match the owner role for minter', async () => {
      const { contract, owner } = fixture;
      const hasRole = await contract.hasTokenRole(
        tokenId,
        ROLES.OWNER,
        owner.address
      );

      expect(hasRole).to.be.true;
    });

    it('should add a new controller', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );

      expect(
        await contract.hasTokenRole(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address
        )
      ).to.be.true;
    });

    it('should add a list of controllers', async () => {
      const { contract } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
      );

      expect(
        await contract.getTokenRoleMembers(tokenId, ROLES.CONTROLLER)
      ).to.eql([
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
      ]);
    });

    it('should add a list of owners', async () => {
      const { contract, owner } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.OWNER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );
      await contract.grantTokenRole(
        tokenId,
        ROLES.OWNER,
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3'
      );

      expect(await contract.getTokenRoleMembers(tokenId, ROLES.OWNER)).to.eql([
        owner.address,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
        '0x2FEd6Ef3c495922263B403319FA6DDB323DD49E3',
      ]);
    });

    it('should not match the owner role for other account', async () => {
      const { contract, otherAccount } = fixture;
      const hasRole = await contract.hasTokenRole(
        tokenId,
        ROLES.OWNER,
        otherAccount.address
      );

      expect(hasRole).to.be.false;
    });

    it('should remove an added controller', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );
      await contract.revokeTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );

      expect(
        await contract.hasTokenRole(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address
        )
      ).to.be.false;
    });

    it('should transfer the token owner role', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.transferFrom(owner.address, otherAccount.address, tokenId);

      expect(await contract.ownerOf(tokenId)).to.equal(otherAccount.address);
      expect(
        await contract.hasTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.true;
      expect(await contract.hasTokenRole(tokenId, ROLES.OWNER, owner.address))
        .to.be.false;
    });

    it('should clean the token controller list after transfer', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );
      await contract.transferFrom(owner.address, otherAccount.address, tokenId);

      expect(await contract.getTokenRoleMembers(tokenId, 1)).to.eql([]);
    });

    it('should not be able to add address role', async () => {
      const { contract, owner, otherAccount } = fixture;
      await expect(
        contract
          .connect(otherAccount)
          .grantTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');

      await expect(
        contract
          .connect(otherAccount)
          .grantTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');
    });

    it('should not be able to remove address role', async () => {
      const { contract, owner, otherAccount } = fixture;
      await expect(
        contract
          .connect(otherAccount)
          .revokeTokenRole(tokenId, ROLES.OWNER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');

      await expect(
        contract
          .connect(otherAccount)
          .revokeTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have token role');
    });

    it('should be able to add token role after owner role granted', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(tokenId, ROLES.OWNER, otherAccount.address);

      expect(
        await contract
          .connect(otherAccount)
          .grantTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      ).to.not.be.reverted;
    });

    it('should emit event when token role is granted', async () => {
      const { contract, owner, otherAccount } = fixture;
      await expect(
        contract.grantTokenRole(tokenId, ROLES.CONTROLLER, otherAccount.address)
      )
        .to.emit(contract, 'TokenRoleGranted')
        .withArgs(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address,
          owner.address
        );
    });

    it('should emit event when token role is revoked', async () => {
      const { contract, owner, otherAccount } = fixture;
      await contract.grantTokenRole(
        tokenId,
        ROLES.CONTROLLER,
        otherAccount.address
      );
      await expect(
        contract.revokeTokenRole(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address
        )
      )
        .to.emit(contract, 'TokenRoleRevoked')
        .withArgs(
          tokenId,
          ROLES.CONTROLLER,
          otherAccount.address,
          owner.address
        );
    });
  });

  describe('Collection Roles', () => {
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    beforeEach(async () => {
      fixture = await loadFixture(defaultFixture);
    });

    it('should assign the owner of the contract on contract creation', async () => {
      const { owner, contract } = fixture;

      expect(await contract.hasCollectionRole(ROLES.OWNER, owner.address)).to.be
        .true;
    });

    it('should assign owner role to address', async () => {
      const { otherAccount, contract } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);

      expect(
        await contract.hasCollectionRole(ROLES.OWNER, otherAccount.address)
      ).to.be.true;
    });

    it('should assign controller role to address', async () => {
      const { owner, contract } = fixture;

      await contract.grantCollectionRole(ROLES.CONTROLLER, owner.address);

      expect(await contract.hasCollectionRole(ROLES.CONTROLLER, owner.address))
        .to.be.true;
    });

    it('should remove an assigned controller', async () => {
      const { otherAccount, contract } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);
      await contract.revokeCollectionRole(ROLES.OWNER, otherAccount.address);

      expect(
        await contract.hasCollectionRole(ROLES.OWNER, otherAccount.address)
      ).to.be.false;
    });

    it('should remove an assigned controller', async () => {
      const { owner, contract } = fixture;

      await contract.grantCollectionRole(ROLES.CONTROLLER, owner.address);
      await contract.revokeCollectionRole(ROLES.CONTROLLER, owner.address);

      expect(await contract.hasCollectionRole(ROLES.CONTROLLER, owner.address))
        .to.be.false;
    });

    it('should fetch the list of controllers', async () => {
      const { owner, contract } = fixture;

      await contract.grantCollectionRole(ROLES.CONTROLLER, owner.address);
      await contract.grantCollectionRole(
        ROLES.CONTROLLER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );

      expect(await contract.getCollectionRoleMembers(ROLES.CONTROLLER)).to.eql([
        owner.address,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      ]);
    });

    it('should fetch the list of owners', async () => {
      const { owner, contract, otherAccount } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);
      await contract.grantCollectionRole(
        ROLES.OWNER,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049'
      );

      expect(await contract.getCollectionRoleMembers(ROLES.OWNER)).to.eql([
        owner.address,
        otherAccount.address,
        '0x7ED735b7095C05d78dF169F991f2b7f1A1F1A049',
      ]);
    });

    it('should not be able to add new owner', async () => {
      const { otherAccount, contract } = fixture;

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.OWNER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should not be able to add new controller', async () => {
      const { otherAccount, contract } = fixture;

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should be able to add roles after owner being granted', async () => {
      const { otherAccount, contract } = fixture;

      await contract.grantCollectionRole(ROLES.OWNER, otherAccount.address);

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      ).to.not.be.reverted;
      await expect(
        contract
          .connect(otherAccount)
          .revokeCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      ).to.not.be.reverted;
    });

    it('should not be able to change roles for controllers', async () => {
      const { owner, otherAccount, contract } = fixture;

      await contract.grantCollectionRole(
        ROLES.CONTROLLER,
        otherAccount.address
      );

      await expect(
        contract
          .connect(otherAccount)
          .grantCollectionRole(ROLES.OWNER, owner.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
      await expect(
        contract
          .connect(otherAccount)
          .revokeCollectionRole(ROLES.OWNER, owner.address)
      ).to.be.revertedWith('FleekAccessControl: must have collection role');
    });

    it('should emit event when role is granted', async () => {
      const { owner, contract, otherAccount } = fixture;

      await expect(
        contract.grantCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      )
        .to.emit(contract, 'CollectionRoleGranted')
        .withArgs(ROLES.CONTROLLER, otherAccount.address, owner.address);
    });

    it('should emit event when role is revoked', async () => {
      const { owner, contract, otherAccount } = fixture;

      await contract.grantCollectionRole(
        ROLES.CONTROLLER,
        otherAccount.address
      );

      await expect(
        contract.revokeCollectionRole(ROLES.CONTROLLER, otherAccount.address)
      )
        .to.emit(contract, 'CollectionRoleRevoked')
        .withArgs(ROLES.CONTROLLER, otherAccount.address, owner.address);
    });
  });

  describe('AccessPoints', () => {
    let tokenId: number;
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    const getDefaultAddParams = () => [tokenId, 'accesspoint.com'];

    beforeEach(async () => {
      fixture = await loadFixture(defaultFixture);
      const { contract } = fixture;

      const response = await contract.mint(
        fixture.owner.address,
        MINT_PARAMS.name,
        MINT_PARAMS.description,
        MINT_PARAMS.externalUrl,
        MINT_PARAMS.ens,
        MINT_PARAMS.commitHash,
        MINT_PARAMS.gitRepository,
        MINT_PARAMS.logo,
        MINT_PARAMS.color
      );

      tokenId = response.value.toNumber();
    });

    it('should add an AP', async () => {
      const { contract, owner } = fixture;

      await expect(contract.addAccessPoint(...getDefaultAddParams()))
        .to.emit(contract, 'NewAccessPoint')
        .withArgs('accesspoint.com', tokenId, owner.address);

      expect(await contract.appAccessPoints(tokenId)).eql(['accesspoint.com']);
    });

    it('should return a AP json object', async () => {
      const { contract, owner } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp).to.eql({
        tokenId,
        score: 0,
        owner: owner.address.toLowerCase(),
        contentVerified: false,
        nameVerified: false,
      });
    });

    it('should revert if AP does not exist', async () => {
      const { contract } = fixture;

      await expect(
        contract.getAccessPointJSON('accesspoint.com')
      ).to.be.revertedWith('FleekERC721: invalid AP');
    });

    it('should increase the AP score', async () => {
      const { contract, owner } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await contract.increaseAccessPointScore('accesspoint.com');

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp).to.eql({
        tokenId,
        score: 1,
        owner: owner.address.toLowerCase(),
        contentVerified: false,
        nameVerified: false,
      });
    });

    it('should decrease the AP score', async () => {
      const { contract, owner } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await contract.increaseAccessPointScore('accesspoint.com');
      await contract.increaseAccessPointScore('accesspoint.com');
      await contract.decreaseAccessPointScore('accesspoint.com');

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp).to.eql({
        tokenId,
        score: 1,
        owner: owner.address.toLowerCase(),
        contentVerified: false,
        nameVerified: false,
      });
    });

    it('should allow anyone to change AP score', async () => {
      const { contract, otherAccount } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());
      await contract.increaseAccessPointScore('accesspoint.com');
      await contract
        .connect(otherAccount)
        .increaseAccessPointScore('accesspoint.com');
    });

    it('should remove an AP', async () => {
      const { contract, owner } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await expect(contract.removeAccessPoint('accesspoint.com'))
        .to.emit(contract, 'RemoveAccessPoint')
        .withArgs('accesspoint.com', tokenId, owner.address);

      expect(await contract.appAccessPoints(tokenId)).eql([]);
    });

    it('should allow only AP owner to remove it', async () => {
      const { contract, otherAccount } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await expect(
        contract.connect(otherAccount).removeAccessPoint('accesspoint.com')
      ).to.be.revertedWith('FleekERC721: must be AP owner');
    });

    it('should not be allowed to add the same AP more than once', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await expect(
        contract.addAccessPoint(...getDefaultAddParams())
      ).to.be.revertedWith('FleekERC721: AP already exists');
    });

    it('should change "contentVerified" to true', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await contract.setAccessPointContentVerify('accesspoint.com', true);

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp.contentVerified).to.be.true;
    });

    it('should change "contentVerified" to false', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
      const beforeParsedAp = JSON.parse(beforeAp);
      expect(beforeParsedAp.contentVerified).to.be.false;

      await contract.setAccessPointContentVerify('accesspoint.com', true);
      await contract.setAccessPointContentVerify('accesspoint.com', false);

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp.contentVerified).to.be.false;
    });

    it('should change "nameVerified" to true', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      await contract.setAccessPointNameVerify('accesspoint.com', true);

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp.nameVerified).to.be.true;
    });

    it('should change "nameVerified" to false', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(...getDefaultAddParams());

      const beforeAp = await contract.getAccessPointJSON('accesspoint.com');
      const beforeParsedAp = JSON.parse(beforeAp);
      expect(beforeParsedAp.nameVerified).to.be.false;

      await contract.setAccessPointNameVerify('accesspoint.com', true);
      await contract.setAccessPointNameVerify('accesspoint.com', false);

      const ap = await contract.getAccessPointJSON('accesspoint.com');
      const parsedAp = JSON.parse(ap);

      expect(parsedAp.nameVerified).to.be.false;
    });

    it('should get a list of added APs for an app', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(tokenId, 'accesspoint1.com');
      await contract.addAccessPoint(tokenId, 'accesspoint2.com');
      await contract.addAccessPoint(tokenId, 'accesspoint3.com');
      await contract.addAccessPoint(tokenId, 'accesspoint4.com');

      const aps = await contract.appAccessPoints(tokenId);

      expect(aps).to.eql([
        'accesspoint1.com',
        'accesspoint2.com',
        'accesspoint3.com',
        'accesspoint4.com',
      ]);
    });

    it('should get a list of added APs for an app after removing one', async () => {
      const { contract } = fixture;

      await contract.addAccessPoint(tokenId, 'accesspoint1.com');
      await contract.addAccessPoint(tokenId, 'accesspoint2.com');
      await contract.addAccessPoint(tokenId, 'accesspoint3.com');
      await contract.addAccessPoint(tokenId, 'accesspoint4.com');

      await contract.removeAccessPoint('accesspoint2.com');

      const aps = await contract.appAccessPoints(tokenId);

      expect(aps).to.eql([
        'accesspoint1.com',
        'accesspoint4.com',
        'accesspoint3.com',
      ]);
    });
  });
});
