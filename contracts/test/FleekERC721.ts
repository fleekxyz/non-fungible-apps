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

    const libraries = {
      FleekSVG: (await (await ethers.getContractFactory('FleekSVG')).deploy())
        .address,
    };

    const Contract = await ethers.getContractFactory('FleekERC721', {
      libraries,
    });
    const contract = await upgrades.deployProxy(
      Contract,
      [COLLECTION_PARAMS.name, COLLECTION_PARAMS.symbol],
      {
        unsafeAllow: ['external-library-linking'],
      }
    );

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
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2NSIgaGVpZ2h0PSIxMDY1IiB2aWV3Qm94PSIwIDAgMTA2NSAxMDY1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPkBpbXBvcnQgdXJsKCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANTAwOzYwMCIpOzwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwNjUiIGhlaWdodD0iMTA2NSIgZmlsbD0idXJsKCNiYWNrZ3JvdW5kKSIgLz48cmVjdCBvcGFjaXR5PSIwLjIiIHdpZHRoPSIxMDY1IiBoZWlnaHQ9IjEwNjUiIGZpbGw9InVybCgjYmFja2dyb3VuZC1yYWRpYWwpIiAvPjxnIGZpbHRlcj0idXJsKCNkaXNrZXR0ZS1zaGFkb3cpIj48cGF0aCBkPSJNODU3LjIzMSAyNzkuNzEyTDkwMi4yNCAyODYuNjc1QzkxMC41NDcgMjg3Ljk2IDkxNy45MTUgMjkyLjcyMSA5MjIuNSAyOTkuNzY4TDkzOC44OTQgMzI0Ljk2NEM5NDIuMjQ5IDMzMC4xMiA5NDMuMzExIDMzNi40MzcgOTQxLjgyNyAzNDIuNDA2TDkzNy43OTggMzU4LjYxNUw5MjQuMDQ5IDM1Ni42NUw5MTkuNDE2IDM3NC4wODRMOTM0LjA2OCAzNzYuMjRMNzkxLjk0NyA5MjIuMTUyQzc4OC4xMDkgOTM2Ljg5NiA3NzMuNjk0IDk0Ni4zMDggNzU4LjY1MSA5NDMuODkzTDE3OS42MzYgODUwLjkyOEMxNjIuMzE4IDg0OC4xNDcgMTUxLjIxNSA4MzAuOTg3IDE1NS43NzYgODE0LjA1MUwxNjAuNDc4IDc5Ni41OUw3MDQuMzE1IDg3OS41NzRMODU3LjIzMSAyNzkuNzEyWiIgZmlsbD0iIzA1MDUwNSIgLz48L2c+PHBhdGggZD0iTTg0MC4yMzEgMjQwLjcxMkw4ODUuMjQgMjQ3LjY3NUM4OTMuNTQ3IDI0OC45NjEgOTAwLjkxNSAyNTMuNzIyIDkwNS41IDI2MC43NjhMOTIxLjg5NCAyODUuOTY1QzkyNS4yNDkgMjkxLjEyIDkyNi4zMTEgMjk3LjQzNyA5MjQuODI3IDMwMy40MDZMOTIwLjc5OCAzMTkuNjE2TDkwNy4wNDkgMzE3LjY1TDkwMi40MTYgMzM1LjA4NEw5MTcuMDY4IDMzNy4yNDFMNzc0Ljk0NyA4ODMuMTUyQzc3MS4xMDkgODk3Ljg5NiA3NTYuNjk0IDkwNy4zMDggNzQxLjY1MSA5MDQuODkzTDE2Mi42MzYgODExLjkyOEMxNDUuMzE4IDgwOS4xNDcgMTM0LjIxNSA3OTEuOTg3IDEzOC43NzYgNzc1LjA1MUwxNDMuNDc4IDc1Ny41OUw2ODcuMzE1IDg0MC41NzRMODQwLjIzMSAyNDAuNzEyWiIgZmlsbD0idXJsKCNtYWluKSIgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMxOS44NDcgMTYxLjUwMkMzMTAuMzU2IDE2MC4wMDcgMzAwLjY3NCAxNjYuMzI2IDI5OC4yMjEgMTc1LjYxNkwxMzguNzI0IDc3OS43NThDMTM2LjI3MSA3ODkuMDQ4IDE0MS45NzcgNzk3Ljc5IDE1MS40NjggNzk5LjI4NUw3NDAuMDYxIDg5MS45NzNDNzQ5LjU1MyA4OTMuNDY3IDc1OS4yMzUgODg3LjE0OCA3NjEuNjg3IDg3Ny44NThMOTAyLjQwNSAzNDQuODU0TDg4OS4xNTggMzQyLjc2OEw4OTguODcyIDMwNS45NzJMOTEyLjExOSAzMDguMDU5TDkxMy43MzMgMzAxLjk0NkM5MTQuODM3IDI5Ny43NjIgOTE0LjMwOSAyOTMuNDc2IDkxMi4yNTEgMjg5LjkyN0w4OTMuNDg0IDI1Ny41NjlDODkxLjE1MyAyNTMuNTQ5IDg4Ny4wNjMgMjUwLjgyMyA4ODIuMjIxIDI1MC4wNjFMODI4LjIwNSAyNDEuNTU0QzgyMi4yMjQgMjQwLjYxMyA4MTUuODY5IDI0Mi43ODMgODExLjQyNyAyNDcuMjg0TDgwNS42ODYgMjUzLjEwM0M4MDQuMjA1IDI1NC42MDMgODAyLjA4NyAyNTUuMzI2IDgwMC4wOTMgMjU1LjAxM0w3ODMuNjExIDI1Mi40MTdMNzM0LjMgNDM5LjE5NkM3MzEuNDM5IDQ1MC4wMzUgNzIwLjE0MyA0NTcuNDA3IDcwOS4wNyA0NTUuNjYzTDMyOC44NDcgMzk1Ljc4OEMzMTcuNzc0IDM5NC4wNDUgMzExLjExNyAzODMuODQ1IDMxMy45NzggMzczLjAwN0wzNjYuNTI4IDE3My45NjJMMzY2LjUzMyAxNzMuOTQxQzM2Ny4yMzQgMTcxLjI0IDM2NS41NzIgMTY4LjcwMiAzNjIuODEgMTY4LjI2N0wzMTkuODQ3IDE2MS41MDJaTTM2OS4zOTIgMTc0LjQxNEwzNjguNjUyIDE3Ny4yMTdMMzE2Ljg0MyAzNzMuNDU4QzMxNC4zOSAzODIuNzQ4IDMyMC4wOTYgMzkxLjQ5IDMyOS41ODcgMzkyLjk4NUw3MDkuODEgNDUyLjg2QzcxOS4zMDEgNDU0LjM1NCA3MjguOTgzIDQ0OC4wMzUgNzMxLjQzNiA0MzguNzQ1TDc4MC43NDcgMjUxLjk2Nkw3ODMuMjQ1IDI0Mi41MDRMNzgzLjk4NSAyMzkuNzAxTDM2OS4zOTIgMTc0LjQxNFoiIGZpbGw9IiMxMzEzMTYiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0idXJsKCNtYWluKSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0zMTkuODQ3IDE2MS41MDJDMzEwLjM1NiAxNjAuMDA3IDMwMC42NzQgMTY2LjMyNiAyOTguMjIxIDE3NS42MTZMMTM4LjcyNCA3NzkuNzU4QzEzNi4yNzEgNzg5LjA0OCAxNDEuOTc3IDc5Ny43OSAxNTEuNDY4IDc5OS4yODVMNzQwLjA2MSA4OTEuOTczQzc0OS41NTMgODkzLjQ2NyA3NTkuMjM1IDg4Ny4xNDggNzYxLjY4NyA4NzcuODU4TDkwMi40MDUgMzQ0Ljg1NEw4ODkuMTU4IDM0Mi43NjhMODk4Ljg3MiAzMDUuOTcyTDkxMi4xMTkgMzA4LjA1OUw5MTMuNzMzIDMwMS45NDZDOTE0LjgzNyAyOTcuNzYyIDkxNC4zMDkgMjkzLjQ3NiA5MTIuMjUxIDI4OS45MjdMODkzLjQ4NCAyNTcuNTY5Qzg5MS4xNTMgMjUzLjU0OSA4ODcuMDYzIDI1MC44MjMgODgyLjIyMSAyNTAuMDYxTDgyOC4yMDUgMjQxLjU1NEM4MjIuMjI0IDI0MC42MTMgODE1Ljg2OSAyNDIuNzgzIDgxMS40MjcgMjQ3LjI4NEw4MDUuNjg2IDI1My4xMDNDODA0LjIwNSAyNTQuNjAzIDgwMi4wODcgMjU1LjMyNiA4MDAuMDkzIDI1NS4wMTNMNzgzLjYxMSAyNTIuNDE3TDczNC4zIDQzOS4xOTZDNzMxLjQzOSA0NTAuMDM1IDcyMC4xNDMgNDU3LjQwNyA3MDkuMDcgNDU1LjY2M0wzMjguODQ3IDM5NS43ODhDMzE3Ljc3NCAzOTQuMDQ1IDMxMS4xMTcgMzgzLjg0NSAzMTMuOTc4IDM3My4wMDdMMzY2LjUyOCAxNzMuOTYyTDM2Ni41MzMgMTczLjk0MUMzNjcuMjM0IDE3MS4yNCAzNjUuNTcyIDE2OC43MDIgMzYyLjgxIDE2OC4yNjdMMzE5Ljg0NyAxNjEuNTAyWk0zNjkuMzkyIDE3NC40MTRMMzY4LjY1MiAxNzcuMjE3TDMxNi44NDMgMzczLjQ1OEMzMTQuMzkgMzgyLjc0OCAzMjAuMDk2IDM5MS40OSAzMjkuNTg3IDM5Mi45ODVMNzA5LjgxIDQ1Mi44NkM3MTkuMzAxIDQ1NC4zNTQgNzI4Ljk4MyA0NDguMDM1IDczMS40MzYgNDM4Ljc0NUw3ODAuNzQ3IDI1MS45NjZMNzgzLjI0NSAyNDIuNTA0TDc4My45ODUgMjM5LjcwMUwzNjkuMzkyIDE3NC40MTRaIiBmaWxsPSJ1cmwoI2Rpc2tldHRlLWdyYWRpZW50KSIgZmlsbC1vcGFjaXR5PSIwLjIiIC8+PHBhdGggZD0iTTMzNS4zOCAyMDguMTEzQzMzNS45MjIgMjA4LjE5OCAzMzYuNDE3IDIwNy42ODYgMzM2LjI4MyAyMDcuMTc5TDMzMC4zOSAxODQuNzk1QzMzMC4yNDkgMTg0LjI2MSAzMjkuNTI5IDE4NC4xNDggMzI5LjEyOSAxODQuNTk3TDMxMi4zNTggMjAzLjQxMUMzMTEuOTc4IDIwMy44MzggMzEyLjE3NCAyMDQuNDU4IDMxMi43MTYgMjA0LjU0NEwzMTcuOTYyIDIwNS4zN0MzMTguMzU3IDIwNS40MzIgMzE4LjU5NSAyMDUuNzk2IDMxOC40OTMgMjA2LjE4M0wzMTQuNyAyMjAuNTUxQzMxNC41OTcgMjIwLjkzOCAzMTQuODM1IDIyMS4zMDIgMzE1LjIzMSAyMjEuMzY0TDMyNC41MzkgMjIyLjgzQzMyNC45MzUgMjIyLjg5MyAzMjUuMzM4IDIyMi42MjkgMzI1LjQ0IDIyMi4yNDJMMzI5LjIzMyAyMDcuODc1QzMyOS4zMzYgMjA3LjQ4OCAzMjkuNzM5IDIwNy4yMjQgMzMwLjEzNSAyMDcuMjg2TDMzNS4zOCAyMDguMTEzWiIgZmlsbD0idXJsKCNtYWluKSIgLz48cGF0aCBkPSJNMzE5LjI4MiAyNjkuMDg3QzMxOS44MjQgMjY5LjE3MyAzMjAuMzE5IDI2OC42NjEgMzIwLjE4NiAyNjguMTU0TDMxNC4yOTIgMjQ1Ljc3QzMxNC4xNTEgMjQ1LjIzNiAzMTMuNDMxIDI0NS4xMjMgMzEzLjAzMSAyNDUuNTcyTDI5Ni4yNjEgMjY0LjM4NkMyOTUuODggMjY0LjgxMiAyOTYuMDc2IDI2NS40MzMgMjk2LjYxOCAyNjUuNTE4TDMwMS44NjQgMjY2LjM0NEMzMDIuMjU5IDI2Ni40MDcgMzAyLjQ5NyAyNjYuNzcxIDMwMi4zOTUgMjY3LjE1OEwyOTguNjAyIDI4MS41MjZDMjk4LjUgMjgxLjkxMyAyOTguNzM3IDI4Mi4yNzcgMjk5LjEzMyAyODIuMzM5TDMwOC40NDEgMjgzLjgwNUMzMDguODM3IDI4My44NjcgMzA5LjI0IDI4My42MDQgMzA5LjM0MyAyODMuMjE3TDMxMy4xMzYgMjY4Ljg0OUMzMTMuMjM4IDI2OC40NjIgMzEzLjY0MSAyNjguMTk5IDMxNC4wMzcgMjY4LjI2MUwzMTkuMjgyIDI2OS4wODdaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+PHBhdGggZD0iTTMwMy4xODQgMzMwLjA2MkMzMDMuNzI2IDMzMC4xNDggMzA0LjIyMSAzMjkuNjM2IDMwNC4wODggMzI5LjEyOEwyOTguMTk0IDMwNi43NDVDMjk4LjA1MyAzMDYuMjExIDI5Ny4zMzMgMzA2LjA5OCAyOTYuOTMzIDMwNi41NDdMMjgwLjE2MyAzMjUuMzYxQzI3OS43ODIgMzI1Ljc4NyAyNzkuOTc5IDMyNi40MDggMjgwLjUyIDMyNi40OTNMMjg1Ljc2NiAzMjcuMzE5QzI4Ni4xNjEgMzI3LjM4MiAyODYuMzk5IDMyNy43NDYgMjg2LjI5NyAzMjguMTMzTDI4Mi41MDQgMzQyLjUwMUMyODIuNDAyIDM0Mi44ODggMjgyLjYzOSAzNDMuMjUyIDI4My4wMzUgMzQzLjMxNEwyOTIuMzQ0IDM0NC43OEMyOTIuNzM5IDM0NC44NDIgMjkzLjE0MiAzNDQuNTc5IDI5My4yNDUgMzQ0LjE5MkwyOTcuMDM4IDMyOS44MjRDMjk3LjE0IDMyOS40MzcgMjk3LjU0MyAzMjkuMTc0IDI5Ny45MzkgMzI5LjIzNkwzMDMuMTg0IDMzMC4wNjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+PHBhdGggc3Ryb2tlPSJ1cmwoI21haW4pIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTI5MC4xMDkgNDYzLjQxOEMyOTIuMzU4IDQ1NC45MDIgMzAxLjIzMyA0NDkuMTEgMzA5LjkzMyA0NTAuNDhMNzcxLjA3IDUyMy4wOTZDNzc5Ljc3IDUyNC40NjcgNzg1IDUzMi40OCA3ODIuNzUyIDU0MC45OTZMNjkyLjA4NiA4ODQuNDE4TDE5OS40NDMgODA2Ljg0TDI5MC4xMDkgNDYzLjQxOFoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMTQiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0idXJsKCNtYWluKSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik03ODcuNTg5IDIzNy4zNDlMNDYwLjM1NCAxODUuODE4TDQwNi4zMjUgMzkwLjQ2OUM0MDMuODcyIDM5OS43NTkgNDA5LjU3OCA0MDguNTAxIDQxOS4wNjkgNDA5Ljk5Nkw3MTEuOTM0IDQ1Ni4xMTRDNzIxLjQyNSA0NTcuNjA5IDczMS4xMDcgNDUxLjI5IDczMy41NiA0NDJMNzg3LjU4OSAyMzcuMzQ5Wk02NjAuMjY5IDI0NS4wMUM2NTUuNTIzIDI0NC4yNjMgNjUwLjY4MiAyNDcuNDIzIDY0OS40NTYgMjUyLjA2OEw2MDcuMzg2IDQxMS40MThDNjA2LjE2IDQxNi4wNjMgNjA5LjAxMyA0MjAuNDM0IDYxMy43NTkgNDIxLjE4MUw2ODIuNDk5IDQzMi4wMDZDNjg3LjI0NSA0MzIuNzUzIDY5Mi4wODYgNDI5LjU5NCA2OTMuMzEyIDQyNC45NDlMNzM1LjM4MiAyNjUuNTk5QzczNi42MDggMjYwLjk1NCA3MzMuNzU1IDI1Ni41ODMgNzI5LjAxIDI1NS44MzVMNjYwLjI2OSAyNDUuMDFaIiBmaWxsPSJ1cmwoI21haW4pIiAvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODY0LjY0MyAyODMuOTM3Qzg2NS4xODYgMjgzLjYwNSA4NjUuNzA4IDI4NC4yNTcgODY1LjIzOSAyODQuNjgzTDg0NC4yNjggMzAzLjcxOUM4NDMuOTM4IDMwNC4wMTggODQ0LjA5MyAzMDQuNTE3IDg0NC41MjYgMzA0LjU0OEw4NTMuNzI2IDMwNS4yMDdDODU0LjE4NCAzMDUuMjQgODU0LjMyMSAzMDUuNzg3IDg1My45NDIgMzA2LjA3MUw4MzMuODg0IDMyMS4xMTJDODMzLjUwNiAzMjEuMzk2IDgzMy42NDMgMzIxLjk0MyA4MzQuMTAxIDMyMS45NzZMODQ0LjAwNyAzMjIuNjg1Qzg0NC40OTEgMzIyLjcyIDg0NC42MDUgMzIzLjMxOSA4NDQuMTc3IDMyMy41OEw3OTcuNzUyIDM1MS45NTRDNzk3LjIwOSAzNTIuMjg2IDc5Ni42ODcgMzUxLjYzNCA3OTcuMTU2IDM1MS4yMDlMODE4LjQwMyAzMzEuOTIyQzgxOC43MzMgMzMxLjYyMiA4MTguNTc3IDMzMS4xMjMgODE4LjE0NSAzMzEuMDkyTDgwOC43NDggMzMwLjQyQzgwOC4yOTIgMzMwLjM4NyA4MDguMTU0IDMyOS44NDMgODA4LjUyOSAzMjkuNTU4TDgyOC4wNTQgMzE0Ljc0NEM4MjguNDMgMzE0LjQ1OSA4MjguMjkxIDMxMy45MTUgODI3LjgzNSAzMTMuODgyTDgxOC4zODkgMzEzLjIwNkM4MTcuOTA0IDMxMy4xNzEgODE3Ljc5IDMxMi41NzIgODE4LjIxOCAzMTIuMzExTDg2NC42NDMgMjgzLjkzN1oiIGZpbGw9IndoaXRlIiAvPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg3ODI3IDAuMTU1NTU3IC0wLjI1NTI2MSAwLjk2Njg3MiAyNTAgNzM1KSI+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0MiIgZmlsbD0iI0U1RTdGOCI+RmxlZWsgVGVzdCBBcHA8L3RleHQ+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB5PSI0MCIgZm9udC1zaXplPSIyMiIgZmlsbD0iIzdGODE5MiI+ZmxlZWsuZXRoPC90ZXh0PjwvZz48aW1hZ2Ugd2lkdGg9IjE2NyIgaGVpZ2h0PSIxNjciIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg3ODI3IDAuMTU1NTU3IC0wLjI1NTI2MSAwLjk2Njg3MiA0NDQuMTE3IDUyNC4xNykiIGhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5Qm1hV3hzUFNKdWIyNWxJaUJvWldsbmFIUTlJakkxTURBaUlIZHBaSFJvUFNJeU1UZ3pJaUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtY2lJSFpwWlhkQ2IzZzlJakFnTUNBeE1qUWdNVFF4TGpVek1UazVPVGs1T1RrNU9UazRJajQ4Y0dGMGFDQmtQU0pOTVRBdU16Z3pJREV5Tmk0NE9UUk1NQ0F3YkRFeU5DQXVNalUxTFRFd0xqazNPU0F4TWpZdU5qTTVMVFV3TGpVMU15QXhOQzQyTXpoNklpQm1hV3hzUFNJalpUTTBaakkySWk4K1BIQmhkR2dnWkQwaVRUWXlMalEyT0NBeE1qa3VNamMzVmpFeUxqQTROV3cxTVM0d05qUXVNVGN0T1M0eE1EWWdNVEEwTGpnMU1Yb2lJR1pwYkd3OUlpTmxaalkxTW1FaUx6NDhjR0YwYUNCa1BTSk5PVGt1TkRrZ05ERXVNell5YkRFdU5EUTJMVEUxTGpRNVNESXlMak00TTJ3MExqTTBJRFEzTGpRNWFEVTBMakl4TTB3M09DNDRNU0E1TXk0Mk1UZHNMVEUzTGpNMk1pQTBMalk0TFRFM0xqWXhOeTAxTGpFd05pMHVPVE0yTFRFeUxqQTROVWd5Tnk0ek1UbHNNaTR4TWpnZ01qUXVOamd4SURNeUlEZ3VPVE0ySURNeUxqSTFOUzA0TGprek5pQTBMak0wTFRRNExqRTNTRFF4TGpFd04wd3pPUzQwT1NBME1TNHpOako2SWlCbWFXeHNQU0lqWm1abUlpOCtQQzl6ZG1jKyIgLz48ZGVmcz48ZmlsdGVyIGlkPSJkaXNrZXR0ZS1zaGFkb3ciIHg9IjcwLjc0ODkiIHk9IjE5NS43MTIiIHdpZHRoPSI5NTUuNzMzIiBoZWlnaHQ9IjgzMi41NTgiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj48ZmVGbG9vZCBmbG9vZC1vcGFjaXR5PSIwIiAvPjxmZUJsZW5kIGluPSJTb3VyY2VHcmFwaGljIiAvPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjQyIiAvPjwvZmlsdGVyPjxsaW5lYXJHcmFkaWVudCBpZD0iYmFja2dyb3VuZCIgeDE9IjUzMi41IiB5MT0iMCIgeDI9IjUzMi41IiB5Mj0iMTA2NSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTMxMzEzIiAvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJiYWNrZ3JvdW5kLXJhZGlhbCIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSg1MzIuNSA1MzIuNSkgcm90YXRlKDg5Ljk2MSkgc2NhbGUoNzM1KSI+PHN0b3Agc3RvcC1jb2xvcj0iI2UzNGYyNiIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlMzRmMjYiIHN0b3Atb3BhY2l0eT0iMCIgLz48L3JhZGlhbEdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZGlza2V0dGUtZ3JhZGllbnQiIHgxPSI5MjUuNjI2IiB5MT0iMjU2Ljg5NiIgeDI9IjEzNi43NzkiIHkyPSI4MDAuMjAzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2UzNGYyNiIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyQzMxM0YiIC8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9Im1haW4iPjxzdG9wIHN0b3AtY29sb3I9IiNlMzRmMjYiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+',
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

  describe('Update Properties', () => {
    let tokenId: number;
    let fixture: Awaited<ReturnType<typeof defaultFixture>>;

    const OTHER_LOGO =
      'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwMCAxMDAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAxMDAwIDEwMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz48cGF0aCBkPSJNNTAwLDEwQzIyOS40LDEwLDEwLDIyOS40LDEwLDUwMGMwLDI3MC42LDIxOS40LDQ5MCw0OTAsNDkwYzI3MC42LDAsNDkwLTIxOS40LDQ5MC00OTBDOTkwLDIyOS40LDc3MC42LDEwLDUwMCwxMHogTTgxNSw4MTVjLTQwLjksNDAuOS04OC42LDczLjEtMTQxLjYsOTUuNWMtNTQuOSwyMy4yLTExMy4yLDM1LTE3My40LDM1Yy02MC4yLDAtMTE4LjUtMTEuOC0xNzMuNC0zNUMyNzMuNiw4ODgsMjI1LjksODU1LjksMTg1LDgxNXMtNzMtODguNi05NS41LTE0MS42Yy0yMy4yLTU0LjktMzUtMTEzLjItMzUtMTczLjRjMC02MC4yLDExLjgtMTE4LjUsMzUtMTczLjRjMjIuNC01Myw1NC42LTEwMC43LDk1LjUtMTQxLjZzODguNi03MywxNDEuNi05NS41YzU0LjktMjMuMiwxMTMuMi0zNSwxNzMuNC0zNWM2MC4yLDAsMTE4LjUsMTEuOCwxNzMuNCwzNWM1MywyMi40LDEwMC43LDU0LjYsMTQxLjYsOTUuNWM0MC45LDQwLjksNzMsODguNiw5NS41LDE0MS42YzIzLjIsNTQuOSwzNSwxMTMuMiwzNSwxNzMuNGMwLDYwLjItMTEuOCwxMTguNS0zNSwxNzMuNEM4ODgsNzI2LjQsODU1LjksNzc0LjEsODE1LDgxNXoiLz48L2c+Cjwvc3ZnPg==';

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

    it('should update token logo', async () => {
      const { contract } = fixture;
      await contract.setTokenLogo(tokenId, OTHER_LOGO);

      const tokenURI = await contract.tokenURI(tokenId);

      const tokenURIDecoded = Buffer.from(
        tokenURI.replace('data:application/json;base64,', ''),
        'base64'
      ).toString('ascii');

      const parsedURI = JSON.parse(tokenURIDecoded);
      expect(parsedURI).to.have.property(
        'image',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2NSIgaGVpZ2h0PSIxMDY1IiB2aWV3Qm94PSIwIDAgMTA2NSAxMDY1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPkBpbXBvcnQgdXJsKCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANTAwOzYwMCIpOzwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwNjUiIGhlaWdodD0iMTA2NSIgZmlsbD0idXJsKCNiYWNrZ3JvdW5kKSIgLz48cmVjdCBvcGFjaXR5PSIwLjIiIHdpZHRoPSIxMDY1IiBoZWlnaHQ9IjEwNjUiIGZpbGw9InVybCgjYmFja2dyb3VuZC1yYWRpYWwpIiAvPjxnIGZpbHRlcj0idXJsKCNkaXNrZXR0ZS1zaGFkb3cpIj48cGF0aCBkPSJNODU3LjIzMSAyNzkuNzEyTDkwMi4yNCAyODYuNjc1QzkxMC41NDcgMjg3Ljk2IDkxNy45MTUgMjkyLjcyMSA5MjIuNSAyOTkuNzY4TDkzOC44OTQgMzI0Ljk2NEM5NDIuMjQ5IDMzMC4xMiA5NDMuMzExIDMzNi40MzcgOTQxLjgyNyAzNDIuNDA2TDkzNy43OTggMzU4LjYxNUw5MjQuMDQ5IDM1Ni42NUw5MTkuNDE2IDM3NC4wODRMOTM0LjA2OCAzNzYuMjRMNzkxLjk0NyA5MjIuMTUyQzc4OC4xMDkgOTM2Ljg5NiA3NzMuNjk0IDk0Ni4zMDggNzU4LjY1MSA5NDMuODkzTDE3OS42MzYgODUwLjkyOEMxNjIuMzE4IDg0OC4xNDcgMTUxLjIxNSA4MzAuOTg3IDE1NS43NzYgODE0LjA1MUwxNjAuNDc4IDc5Ni41OUw3MDQuMzE1IDg3OS41NzRMODU3LjIzMSAyNzkuNzEyWiIgZmlsbD0iIzA1MDUwNSIgLz48L2c+PHBhdGggZD0iTTg0MC4yMzEgMjQwLjcxMkw4ODUuMjQgMjQ3LjY3NUM4OTMuNTQ3IDI0OC45NjEgOTAwLjkxNSAyNTMuNzIyIDkwNS41IDI2MC43NjhMOTIxLjg5NCAyODUuOTY1QzkyNS4yNDkgMjkxLjEyIDkyNi4zMTEgMjk3LjQzNyA5MjQuODI3IDMwMy40MDZMOTIwLjc5OCAzMTkuNjE2TDkwNy4wNDkgMzE3LjY1TDkwMi40MTYgMzM1LjA4NEw5MTcuMDY4IDMzNy4yNDFMNzc0Ljk0NyA4ODMuMTUyQzc3MS4xMDkgODk3Ljg5NiA3NTYuNjk0IDkwNy4zMDggNzQxLjY1MSA5MDQuODkzTDE2Mi42MzYgODExLjkyOEMxNDUuMzE4IDgwOS4xNDcgMTM0LjIxNSA3OTEuOTg3IDEzOC43NzYgNzc1LjA1MUwxNDMuNDc4IDc1Ny41OUw2ODcuMzE1IDg0MC41NzRMODQwLjIzMSAyNDAuNzEyWiIgZmlsbD0idXJsKCNtYWluKSIgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMxOS44NDcgMTYxLjUwMkMzMTAuMzU2IDE2MC4wMDcgMzAwLjY3NCAxNjYuMzI2IDI5OC4yMjEgMTc1LjYxNkwxMzguNzI0IDc3OS43NThDMTM2LjI3MSA3ODkuMDQ4IDE0MS45NzcgNzk3Ljc5IDE1MS40NjggNzk5LjI4NUw3NDAuMDYxIDg5MS45NzNDNzQ5LjU1MyA4OTMuNDY3IDc1OS4yMzUgODg3LjE0OCA3NjEuNjg3IDg3Ny44NThMOTAyLjQwNSAzNDQuODU0TDg4OS4xNTggMzQyLjc2OEw4OTguODcyIDMwNS45NzJMOTEyLjExOSAzMDguMDU5TDkxMy43MzMgMzAxLjk0NkM5MTQuODM3IDI5Ny43NjIgOTE0LjMwOSAyOTMuNDc2IDkxMi4yNTEgMjg5LjkyN0w4OTMuNDg0IDI1Ny41NjlDODkxLjE1MyAyNTMuNTQ5IDg4Ny4wNjMgMjUwLjgyMyA4ODIuMjIxIDI1MC4wNjFMODI4LjIwNSAyNDEuNTU0QzgyMi4yMjQgMjQwLjYxMyA4MTUuODY5IDI0Mi43ODMgODExLjQyNyAyNDcuMjg0TDgwNS42ODYgMjUzLjEwM0M4MDQuMjA1IDI1NC42MDMgODAyLjA4NyAyNTUuMzI2IDgwMC4wOTMgMjU1LjAxM0w3ODMuNjExIDI1Mi40MTdMNzM0LjMgNDM5LjE5NkM3MzEuNDM5IDQ1MC4wMzUgNzIwLjE0MyA0NTcuNDA3IDcwOS4wNyA0NTUuNjYzTDMyOC44NDcgMzk1Ljc4OEMzMTcuNzc0IDM5NC4wNDUgMzExLjExNyAzODMuODQ1IDMxMy45NzggMzczLjAwN0wzNjYuNTI4IDE3My45NjJMMzY2LjUzMyAxNzMuOTQxQzM2Ny4yMzQgMTcxLjI0IDM2NS41NzIgMTY4LjcwMiAzNjIuODEgMTY4LjI2N0wzMTkuODQ3IDE2MS41MDJaTTM2OS4zOTIgMTc0LjQxNEwzNjguNjUyIDE3Ny4yMTdMMzE2Ljg0MyAzNzMuNDU4QzMxNC4zOSAzODIuNzQ4IDMyMC4wOTYgMzkxLjQ5IDMyOS41ODcgMzkyLjk4NUw3MDkuODEgNDUyLjg2QzcxOS4zMDEgNDU0LjM1NCA3MjguOTgzIDQ0OC4wMzUgNzMxLjQzNiA0MzguNzQ1TDc4MC43NDcgMjUxLjk2Nkw3ODMuMjQ1IDI0Mi41MDRMNzgzLjk4NSAyMzkuNzAxTDM2OS4zOTIgMTc0LjQxNFoiIGZpbGw9IiMxMzEzMTYiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0idXJsKCNtYWluKSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0zMTkuODQ3IDE2MS41MDJDMzEwLjM1NiAxNjAuMDA3IDMwMC42NzQgMTY2LjMyNiAyOTguMjIxIDE3NS42MTZMMTM4LjcyNCA3NzkuNzU4QzEzNi4yNzEgNzg5LjA0OCAxNDEuOTc3IDc5Ny43OSAxNTEuNDY4IDc5OS4yODVMNzQwLjA2MSA4OTEuOTczQzc0OS41NTMgODkzLjQ2NyA3NTkuMjM1IDg4Ny4xNDggNzYxLjY4NyA4NzcuODU4TDkwMi40MDUgMzQ0Ljg1NEw4ODkuMTU4IDM0Mi43NjhMODk4Ljg3MiAzMDUuOTcyTDkxMi4xMTkgMzA4LjA1OUw5MTMuNzMzIDMwMS45NDZDOTE0LjgzNyAyOTcuNzYyIDkxNC4zMDkgMjkzLjQ3NiA5MTIuMjUxIDI4OS45MjdMODkzLjQ4NCAyNTcuNTY5Qzg5MS4xNTMgMjUzLjU0OSA4ODcuMDYzIDI1MC44MjMgODgyLjIyMSAyNTAuMDYxTDgyOC4yMDUgMjQxLjU1NEM4MjIuMjI0IDI0MC42MTMgODE1Ljg2OSAyNDIuNzgzIDgxMS40MjcgMjQ3LjI4NEw4MDUuNjg2IDI1My4xMDNDODA0LjIwNSAyNTQuNjAzIDgwMi4wODcgMjU1LjMyNiA4MDAuMDkzIDI1NS4wMTNMNzgzLjYxMSAyNTIuNDE3TDczNC4zIDQzOS4xOTZDNzMxLjQzOSA0NTAuMDM1IDcyMC4xNDMgNDU3LjQwNyA3MDkuMDcgNDU1LjY2M0wzMjguODQ3IDM5NS43ODhDMzE3Ljc3NCAzOTQuMDQ1IDMxMS4xMTcgMzgzLjg0NSAzMTMuOTc4IDM3My4wMDdMMzY2LjUyOCAxNzMuOTYyTDM2Ni41MzMgMTczLjk0MUMzNjcuMjM0IDE3MS4yNCAzNjUuNTcyIDE2OC43MDIgMzYyLjgxIDE2OC4yNjdMMzE5Ljg0NyAxNjEuNTAyWk0zNjkuMzkyIDE3NC40MTRMMzY4LjY1MiAxNzcuMjE3TDMxNi44NDMgMzczLjQ1OEMzMTQuMzkgMzgyLjc0OCAzMjAuMDk2IDM5MS40OSAzMjkuNTg3IDM5Mi45ODVMNzA5LjgxIDQ1Mi44NkM3MTkuMzAxIDQ1NC4zNTQgNzI4Ljk4MyA0NDguMDM1IDczMS40MzYgNDM4Ljc0NUw3ODAuNzQ3IDI1MS45NjZMNzgzLjI0NSAyNDIuNTA0TDc4My45ODUgMjM5LjcwMUwzNjkuMzkyIDE3NC40MTRaIiBmaWxsPSJ1cmwoI2Rpc2tldHRlLWdyYWRpZW50KSIgZmlsbC1vcGFjaXR5PSIwLjIiIC8+PHBhdGggZD0iTTMzNS4zOCAyMDguMTEzQzMzNS45MjIgMjA4LjE5OCAzMzYuNDE3IDIwNy42ODYgMzM2LjI4MyAyMDcuMTc5TDMzMC4zOSAxODQuNzk1QzMzMC4yNDkgMTg0LjI2MSAzMjkuNTI5IDE4NC4xNDggMzI5LjEyOSAxODQuNTk3TDMxMi4zNTggMjAzLjQxMUMzMTEuOTc4IDIwMy44MzggMzEyLjE3NCAyMDQuNDU4IDMxMi43MTYgMjA0LjU0NEwzMTcuOTYyIDIwNS4zN0MzMTguMzU3IDIwNS40MzIgMzE4LjU5NSAyMDUuNzk2IDMxOC40OTMgMjA2LjE4M0wzMTQuNyAyMjAuNTUxQzMxNC41OTcgMjIwLjkzOCAzMTQuODM1IDIyMS4zMDIgMzE1LjIzMSAyMjEuMzY0TDMyNC41MzkgMjIyLjgzQzMyNC45MzUgMjIyLjg5MyAzMjUuMzM4IDIyMi42MjkgMzI1LjQ0IDIyMi4yNDJMMzI5LjIzMyAyMDcuODc1QzMyOS4zMzYgMjA3LjQ4OCAzMjkuNzM5IDIwNy4yMjQgMzMwLjEzNSAyMDcuMjg2TDMzNS4zOCAyMDguMTEzWiIgZmlsbD0idXJsKCNtYWluKSIgLz48cGF0aCBkPSJNMzE5LjI4MiAyNjkuMDg3QzMxOS44MjQgMjY5LjE3MyAzMjAuMzE5IDI2OC42NjEgMzIwLjE4NiAyNjguMTU0TDMxNC4yOTIgMjQ1Ljc3QzMxNC4xNTEgMjQ1LjIzNiAzMTMuNDMxIDI0NS4xMjMgMzEzLjAzMSAyNDUuNTcyTDI5Ni4yNjEgMjY0LjM4NkMyOTUuODggMjY0LjgxMiAyOTYuMDc2IDI2NS40MzMgMjk2LjYxOCAyNjUuNTE4TDMwMS44NjQgMjY2LjM0NEMzMDIuMjU5IDI2Ni40MDcgMzAyLjQ5NyAyNjYuNzcxIDMwMi4zOTUgMjY3LjE1OEwyOTguNjAyIDI4MS41MjZDMjk4LjUgMjgxLjkxMyAyOTguNzM3IDI4Mi4yNzcgMjk5LjEzMyAyODIuMzM5TDMwOC40NDEgMjgzLjgwNUMzMDguODM3IDI4My44NjcgMzA5LjI0IDI4My42MDQgMzA5LjM0MyAyODMuMjE3TDMxMy4xMzYgMjY4Ljg0OUMzMTMuMjM4IDI2OC40NjIgMzEzLjY0MSAyNjguMTk5IDMxNC4wMzcgMjY4LjI2MUwzMTkuMjgyIDI2OS4wODdaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+PHBhdGggZD0iTTMwMy4xODQgMzMwLjA2MkMzMDMuNzI2IDMzMC4xNDggMzA0LjIyMSAzMjkuNjM2IDMwNC4wODggMzI5LjEyOEwyOTguMTk0IDMwNi43NDVDMjk4LjA1MyAzMDYuMjExIDI5Ny4zMzMgMzA2LjA5OCAyOTYuOTMzIDMwNi41NDdMMjgwLjE2MyAzMjUuMzYxQzI3OS43ODIgMzI1Ljc4NyAyNzkuOTc5IDMyNi40MDggMjgwLjUyIDMyNi40OTNMMjg1Ljc2NiAzMjcuMzE5QzI4Ni4xNjEgMzI3LjM4MiAyODYuMzk5IDMyNy43NDYgMjg2LjI5NyAzMjguMTMzTDI4Mi41MDQgMzQyLjUwMUMyODIuNDAyIDM0Mi44ODggMjgyLjYzOSAzNDMuMjUyIDI4My4wMzUgMzQzLjMxNEwyOTIuMzQ0IDM0NC43OEMyOTIuNzM5IDM0NC44NDIgMjkzLjE0MiAzNDQuNTc5IDI5My4yNDUgMzQ0LjE5MkwyOTcuMDM4IDMyOS44MjRDMjk3LjE0IDMyOS40MzcgMjk3LjU0MyAzMjkuMTc0IDI5Ny45MzkgMzI5LjIzNkwzMDMuMTg0IDMzMC4wNjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+PHBhdGggc3Ryb2tlPSJ1cmwoI21haW4pIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTI5MC4xMDkgNDYzLjQxOEMyOTIuMzU4IDQ1NC45MDIgMzAxLjIzMyA0NDkuMTEgMzA5LjkzMyA0NTAuNDhMNzcxLjA3IDUyMy4wOTZDNzc5Ljc3IDUyNC40NjcgNzg1IDUzMi40OCA3ODIuNzUyIDU0MC45OTZMNjkyLjA4NiA4ODQuNDE4TDE5OS40NDMgODA2Ljg0TDI5MC4xMDkgNDYzLjQxOFoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMTQiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0idXJsKCNtYWluKSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik03ODcuNTg5IDIzNy4zNDlMNDYwLjM1NCAxODUuODE4TDQwNi4zMjUgMzkwLjQ2OUM0MDMuODcyIDM5OS43NTkgNDA5LjU3OCA0MDguNTAxIDQxOS4wNjkgNDA5Ljk5Nkw3MTEuOTM0IDQ1Ni4xMTRDNzIxLjQyNSA0NTcuNjA5IDczMS4xMDcgNDUxLjI5IDczMy41NiA0NDJMNzg3LjU4OSAyMzcuMzQ5Wk02NjAuMjY5IDI0NS4wMUM2NTUuNTIzIDI0NC4yNjMgNjUwLjY4MiAyNDcuNDIzIDY0OS40NTYgMjUyLjA2OEw2MDcuMzg2IDQxMS40MThDNjA2LjE2IDQxNi4wNjMgNjA5LjAxMyA0MjAuNDM0IDYxMy43NTkgNDIxLjE4MUw2ODIuNDk5IDQzMi4wMDZDNjg3LjI0NSA0MzIuNzUzIDY5Mi4wODYgNDI5LjU5NCA2OTMuMzEyIDQyNC45NDlMNzM1LjM4MiAyNjUuNTk5QzczNi42MDggMjYwLjk1NCA3MzMuNzU1IDI1Ni41ODMgNzI5LjAxIDI1NS44MzVMNjYwLjI2OSAyNDUuMDFaIiBmaWxsPSJ1cmwoI21haW4pIiAvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODY0LjY0MyAyODMuOTM3Qzg2NS4xODYgMjgzLjYwNSA4NjUuNzA4IDI4NC4yNTcgODY1LjIzOSAyODQuNjgzTDg0NC4yNjggMzAzLjcxOUM4NDMuOTM4IDMwNC4wMTggODQ0LjA5MyAzMDQuNTE3IDg0NC41MjYgMzA0LjU0OEw4NTMuNzI2IDMwNS4yMDdDODU0LjE4NCAzMDUuMjQgODU0LjMyMSAzMDUuNzg3IDg1My45NDIgMzA2LjA3MUw4MzMuODg0IDMyMS4xMTJDODMzLjUwNiAzMjEuMzk2IDgzMy42NDMgMzIxLjk0MyA4MzQuMTAxIDMyMS45NzZMODQ0LjAwNyAzMjIuNjg1Qzg0NC40OTEgMzIyLjcyIDg0NC42MDUgMzIzLjMxOSA4NDQuMTc3IDMyMy41OEw3OTcuNzUyIDM1MS45NTRDNzk3LjIwOSAzNTIuMjg2IDc5Ni42ODcgMzUxLjYzNCA3OTcuMTU2IDM1MS4yMDlMODE4LjQwMyAzMzEuOTIyQzgxOC43MzMgMzMxLjYyMiA4MTguNTc3IDMzMS4xMjMgODE4LjE0NSAzMzEuMDkyTDgwOC43NDggMzMwLjQyQzgwOC4yOTIgMzMwLjM4NyA4MDguMTU0IDMyOS44NDMgODA4LjUyOSAzMjkuNTU4TDgyOC4wNTQgMzE0Ljc0NEM4MjguNDMgMzE0LjQ1OSA4MjguMjkxIDMxMy45MTUgODI3LjgzNSAzMTMuODgyTDgxOC4zODkgMzEzLjIwNkM4MTcuOTA0IDMxMy4xNzEgODE3Ljc5IDMxMi41NzIgODE4LjIxOCAzMTIuMzExTDg2NC42NDMgMjgzLjkzN1oiIGZpbGw9IndoaXRlIiAvPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg3ODI3IDAuMTU1NTU3IC0wLjI1NTI2MSAwLjk2Njg3MiAyNTAgNzM1KSI+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0MiIgZmlsbD0iI0U1RTdGOCI+RmxlZWsgVGVzdCBBcHA8L3RleHQ+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB5PSI0MCIgZm9udC1zaXplPSIyMiIgZmlsbD0iIzdGODE5MiI+ZmxlZWsuZXRoPC90ZXh0PjwvZz48aW1hZ2Ugd2lkdGg9IjE2NyIgaGVpZ2h0PSIxNjciIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg3ODI3IDAuMTU1NTU3IC0wLjI1NTI2MSAwLjk2Njg3MiA0NDQuMTE3IDUyNC4xNykiIGhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lJSGc5SWpCd2VDSWdlVDBpTUhCNElpQjJhV1YzUW05NFBTSXdJREFnTVRBd01DQXhNREF3SWlCbGJtRmliR1V0WW1GamEyZHliM1Z1WkQwaWJtVjNJREFnTUNBeE1EQXdJREV3TURBaUlIaHRiRHB6Y0dGalpUMGljSEpsYzJWeWRtVWlQZ284Wno0OGNHRjBhQ0JrUFNKTk5UQXdMREV3UXpJeU9TNDBMREV3TERFd0xESXlPUzQwTERFd0xEVXdNR013TERJM01DNDJMREl4T1M0MExEUTVNQ3cwT1RBc05Ea3dZekkzTUM0MkxEQXNORGt3TFRJeE9TNDBMRFE1TUMwME9UQkRPVGt3TERJeU9TNDBMRGMzTUM0MkxERXdMRFV3TUN3eE1Ib2dUVGd4TlN3NE1UVmpMVFF3TGprc05EQXVPUzA0T0M0MkxEY3pMakV0TVRReExqWXNPVFV1TldNdE5UUXVPU3d5TXk0eUxURXhNeTR5TERNMUxURTNNeTQwTERNMVl5MDJNQzR5TERBdE1URTRMalV0TVRFdU9DMHhOek11TkMwek5VTXlOek11Tml3NE9EZ3NNakkxTGprc09EVTFMamtzTVRnMUxEZ3hOWE10TnpNdE9EZ3VOaTA1TlM0MUxURTBNUzQyWXkweU15NHlMVFUwTGprdE16VXRNVEV6TGpJdE16VXRNVGN6TGpSak1DMDJNQzR5TERFeExqZ3RNVEU0TGpVc016VXRNVGN6TGpSak1qSXVOQzAxTXl3MU5DNDJMVEV3TUM0M0xEazFMalV0TVRReExqWnpPRGd1TmkwM015d3hOREV1TmkwNU5TNDFZelUwTGprdE1qTXVNaXd4TVRNdU1pMHpOU3d4TnpNdU5DMHpOV00yTUM0eUxEQXNNVEU0TGpVc01URXVPQ3d4TnpNdU5Dd3pOV00xTXl3eU1pNDBMREV3TUM0M0xEVTBMallzTVRReExqWXNPVFV1TldNME1DNDVMRFF3TGprc056TXNPRGd1Tml3NU5TNDFMREUwTVM0Mll6SXpMaklzTlRRdU9Td3pOU3d4TVRNdU1pd3pOU3d4TnpNdU5HTXdMRFl3TGpJdE1URXVPQ3d4TVRndU5TMHpOU3d4TnpNdU5FTTRPRGdzTnpJMkxqUXNPRFUxTGprc056YzBMakVzT0RFMUxEZ3hOWG9pTHo0OEwyYytDand2YzNablBnPT0iIC8+PGRlZnM+PGZpbHRlciBpZD0iZGlza2V0dGUtc2hhZG93IiB4PSI3MC43NDg5IiB5PSIxOTUuNzEyIiB3aWR0aD0iOTU1LjczMyIgaGVpZ2h0PSI4MzIuNTU4IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0MiIgLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9ImJhY2tncm91bmQiIHgxPSI1MzIuNSIgeTE9IjAiIHgyPSI1MzIuNSIgeTI9IjEwNjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEzMTMxMyIgLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iYmFja2dyb3VuZC1yYWRpYWwiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTMyLjUgNTMyLjUpIHJvdGF0ZSg4OS45NjEpIHNjYWxlKDczNSkiPjxzdG9wIHN0b3AtY29sb3I9IiNlMzRmMjYiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTM0ZjI2IiBzdG9wLW9wYWNpdHk9IjAiIC8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImRpc2tldHRlLWdyYWRpZW50IiB4MT0iOTI1LjYyNiIgeTE9IjI1Ni44OTYiIHgyPSIxMzYuNzc5IiB5Mj0iODAwLjIwMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNlMzRmMjYiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMkMzMTNGIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJtYWluIj48c3RvcCBzdG9wLWNvbG9yPSIjZTM0ZjI2IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
      );
    });

    it('should update token color', async () => {
      const { contract } = fixture;
      await contract.setTokenColor(tokenId, 0x123456);

      const tokenURI = await contract.tokenURI(tokenId);

      const tokenURIDecoded = Buffer.from(
        tokenURI.replace('data:application/json;base64,', ''),
        'base64'
      ).toString('ascii');

      const parsedURI = JSON.parse(tokenURIDecoded);

      expect(parsedURI.attributes).to.have.deep.contain({
        trait_type: 'Color',
        value: '#123456',
      });
    });

    it('should update the token logo and color', async () => {
      const { contract } = fixture;
      await contract.setTokenLogoAndColor(tokenId, OTHER_LOGO, 0x123456);

      const tokenURI = await contract.tokenURI(tokenId);

      const tokenURIDecoded = Buffer.from(
        tokenURI.replace('data:application/json;base64,', ''),
        'base64'
      ).toString('ascii');

      const parsedURI = JSON.parse(tokenURIDecoded);

      expect(parsedURI.attributes).to.have.deep.contain({
        trait_type: 'Color',
        value: '#123456',
      });

      expect(parsedURI).to.have.property(
        'image',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA2NSIgaGVpZ2h0PSIxMDY1IiB2aWV3Qm94PSIwIDAgMTA2NSAxMDY1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPkBpbXBvcnQgdXJsKCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANTAwOzYwMCIpOzwvc3R5bGU+PHJlY3Qgd2lkdGg9IjEwNjUiIGhlaWdodD0iMTA2NSIgZmlsbD0idXJsKCNiYWNrZ3JvdW5kKSIgLz48cmVjdCBvcGFjaXR5PSIwLjIiIHdpZHRoPSIxMDY1IiBoZWlnaHQ9IjEwNjUiIGZpbGw9InVybCgjYmFja2dyb3VuZC1yYWRpYWwpIiAvPjxnIGZpbHRlcj0idXJsKCNkaXNrZXR0ZS1zaGFkb3cpIj48cGF0aCBkPSJNODU3LjIzMSAyNzkuNzEyTDkwMi4yNCAyODYuNjc1QzkxMC41NDcgMjg3Ljk2IDkxNy45MTUgMjkyLjcyMSA5MjIuNSAyOTkuNzY4TDkzOC44OTQgMzI0Ljk2NEM5NDIuMjQ5IDMzMC4xMiA5NDMuMzExIDMzNi40MzcgOTQxLjgyNyAzNDIuNDA2TDkzNy43OTggMzU4LjYxNUw5MjQuMDQ5IDM1Ni42NUw5MTkuNDE2IDM3NC4wODRMOTM0LjA2OCAzNzYuMjRMNzkxLjk0NyA5MjIuMTUyQzc4OC4xMDkgOTM2Ljg5NiA3NzMuNjk0IDk0Ni4zMDggNzU4LjY1MSA5NDMuODkzTDE3OS42MzYgODUwLjkyOEMxNjIuMzE4IDg0OC4xNDcgMTUxLjIxNSA4MzAuOTg3IDE1NS43NzYgODE0LjA1MUwxNjAuNDc4IDc5Ni41OUw3MDQuMzE1IDg3OS41NzRMODU3LjIzMSAyNzkuNzEyWiIgZmlsbD0iIzA1MDUwNSIgLz48L2c+PHBhdGggZD0iTTg0MC4yMzEgMjQwLjcxMkw4ODUuMjQgMjQ3LjY3NUM4OTMuNTQ3IDI0OC45NjEgOTAwLjkxNSAyNTMuNzIyIDkwNS41IDI2MC43NjhMOTIxLjg5NCAyODUuOTY1QzkyNS4yNDkgMjkxLjEyIDkyNi4zMTEgMjk3LjQzNyA5MjQuODI3IDMwMy40MDZMOTIwLjc5OCAzMTkuNjE2TDkwNy4wNDkgMzE3LjY1TDkwMi40MTYgMzM1LjA4NEw5MTcuMDY4IDMzNy4yNDFMNzc0Ljk0NyA4ODMuMTUyQzc3MS4xMDkgODk3Ljg5NiA3NTYuNjk0IDkwNy4zMDggNzQxLjY1MSA5MDQuODkzTDE2Mi42MzYgODExLjkyOEMxNDUuMzE4IDgwOS4xNDcgMTM0LjIxNSA3OTEuOTg3IDEzOC43NzYgNzc1LjA1MUwxNDMuNDc4IDc1Ny41OUw2ODcuMzE1IDg0MC41NzRMODQwLjIzMSAyNDAuNzEyWiIgZmlsbD0idXJsKCNtYWluKSIgLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTMxOS44NDcgMTYxLjUwMkMzMTAuMzU2IDE2MC4wMDcgMzAwLjY3NCAxNjYuMzI2IDI5OC4yMjEgMTc1LjYxNkwxMzguNzI0IDc3OS43NThDMTM2LjI3MSA3ODkuMDQ4IDE0MS45NzcgNzk3Ljc5IDE1MS40NjggNzk5LjI4NUw3NDAuMDYxIDg5MS45NzNDNzQ5LjU1MyA4OTMuNDY3IDc1OS4yMzUgODg3LjE0OCA3NjEuNjg3IDg3Ny44NThMOTAyLjQwNSAzNDQuODU0TDg4OS4xNTggMzQyLjc2OEw4OTguODcyIDMwNS45NzJMOTEyLjExOSAzMDguMDU5TDkxMy43MzMgMzAxLjk0NkM5MTQuODM3IDI5Ny43NjIgOTE0LjMwOSAyOTMuNDc2IDkxMi4yNTEgMjg5LjkyN0w4OTMuNDg0IDI1Ny41NjlDODkxLjE1MyAyNTMuNTQ5IDg4Ny4wNjMgMjUwLjgyMyA4ODIuMjIxIDI1MC4wNjFMODI4LjIwNSAyNDEuNTU0QzgyMi4yMjQgMjQwLjYxMyA4MTUuODY5IDI0Mi43ODMgODExLjQyNyAyNDcuMjg0TDgwNS42ODYgMjUzLjEwM0M4MDQuMjA1IDI1NC42MDMgODAyLjA4NyAyNTUuMzI2IDgwMC4wOTMgMjU1LjAxM0w3ODMuNjExIDI1Mi40MTdMNzM0LjMgNDM5LjE5NkM3MzEuNDM5IDQ1MC4wMzUgNzIwLjE0MyA0NTcuNDA3IDcwOS4wNyA0NTUuNjYzTDMyOC44NDcgMzk1Ljc4OEMzMTcuNzc0IDM5NC4wNDUgMzExLjExNyAzODMuODQ1IDMxMy45NzggMzczLjAwN0wzNjYuNTI4IDE3My45NjJMMzY2LjUzMyAxNzMuOTQxQzM2Ny4yMzQgMTcxLjI0IDM2NS41NzIgMTY4LjcwMiAzNjIuODEgMTY4LjI2N0wzMTkuODQ3IDE2MS41MDJaTTM2OS4zOTIgMTc0LjQxNEwzNjguNjUyIDE3Ny4yMTdMMzE2Ljg0MyAzNzMuNDU4QzMxNC4zOSAzODIuNzQ4IDMyMC4wOTYgMzkxLjQ5IDMyOS41ODcgMzkyLjk4NUw3MDkuODEgNDUyLjg2QzcxOS4zMDEgNDU0LjM1NCA3MjguOTgzIDQ0OC4wMzUgNzMxLjQzNiA0MzguNzQ1TDc4MC43NDcgMjUxLjk2Nkw3ODMuMjQ1IDI0Mi41MDRMNzgzLjk4NSAyMzkuNzAxTDM2OS4zOTIgMTc0LjQxNFoiIGZpbGw9IiMxMzEzMTYiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0idXJsKCNtYWluKSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0zMTkuODQ3IDE2MS41MDJDMzEwLjM1NiAxNjAuMDA3IDMwMC42NzQgMTY2LjMyNiAyOTguMjIxIDE3NS42MTZMMTM4LjcyNCA3NzkuNzU4QzEzNi4yNzEgNzg5LjA0OCAxNDEuOTc3IDc5Ny43OSAxNTEuNDY4IDc5OS4yODVMNzQwLjA2MSA4OTEuOTczQzc0OS41NTMgODkzLjQ2NyA3NTkuMjM1IDg4Ny4xNDggNzYxLjY4NyA4NzcuODU4TDkwMi40MDUgMzQ0Ljg1NEw4ODkuMTU4IDM0Mi43NjhMODk4Ljg3MiAzMDUuOTcyTDkxMi4xMTkgMzA4LjA1OUw5MTMuNzMzIDMwMS45NDZDOTE0LjgzNyAyOTcuNzYyIDkxNC4zMDkgMjkzLjQ3NiA5MTIuMjUxIDI4OS45MjdMODkzLjQ4NCAyNTcuNTY5Qzg5MS4xNTMgMjUzLjU0OSA4ODcuMDYzIDI1MC44MjMgODgyLjIyMSAyNTAuMDYxTDgyOC4yMDUgMjQxLjU1NEM4MjIuMjI0IDI0MC42MTMgODE1Ljg2OSAyNDIuNzgzIDgxMS40MjcgMjQ3LjI4NEw4MDUuNjg2IDI1My4xMDNDODA0LjIwNSAyNTQuNjAzIDgwMi4wODcgMjU1LjMyNiA4MDAuMDkzIDI1NS4wMTNMNzgzLjYxMSAyNTIuNDE3TDczNC4zIDQzOS4xOTZDNzMxLjQzOSA0NTAuMDM1IDcyMC4xNDMgNDU3LjQwNyA3MDkuMDcgNDU1LjY2M0wzMjguODQ3IDM5NS43ODhDMzE3Ljc3NCAzOTQuMDQ1IDMxMS4xMTcgMzgzLjg0NSAzMTMuOTc4IDM3My4wMDdMMzY2LjUyOCAxNzMuOTYyTDM2Ni41MzMgMTczLjk0MUMzNjcuMjM0IDE3MS4yNCAzNjUuNTcyIDE2OC43MDIgMzYyLjgxIDE2OC4yNjdMMzE5Ljg0NyAxNjEuNTAyWk0zNjkuMzkyIDE3NC40MTRMMzY4LjY1MiAxNzcuMjE3TDMxNi44NDMgMzczLjQ1OEMzMTQuMzkgMzgyLjc0OCAzMjAuMDk2IDM5MS40OSAzMjkuNTg3IDM5Mi45ODVMNzA5LjgxIDQ1Mi44NkM3MTkuMzAxIDQ1NC4zNTQgNzI4Ljk4MyA0NDguMDM1IDczMS40MzYgNDM4Ljc0NUw3ODAuNzQ3IDI1MS45NjZMNzgzLjI0NSAyNDIuNTA0TDc4My45ODUgMjM5LjcwMUwzNjkuMzkyIDE3NC40MTRaIiBmaWxsPSJ1cmwoI2Rpc2tldHRlLWdyYWRpZW50KSIgZmlsbC1vcGFjaXR5PSIwLjIiIC8+PHBhdGggZD0iTTMzNS4zOCAyMDguMTEzQzMzNS45MjIgMjA4LjE5OCAzMzYuNDE3IDIwNy42ODYgMzM2LjI4MyAyMDcuMTc5TDMzMC4zOSAxODQuNzk1QzMzMC4yNDkgMTg0LjI2MSAzMjkuNTI5IDE4NC4xNDggMzI5LjEyOSAxODQuNTk3TDMxMi4zNTggMjAzLjQxMUMzMTEuOTc4IDIwMy44MzggMzEyLjE3NCAyMDQuNDU4IDMxMi43MTYgMjA0LjU0NEwzMTcuOTYyIDIwNS4zN0MzMTguMzU3IDIwNS40MzIgMzE4LjU5NSAyMDUuNzk2IDMxOC40OTMgMjA2LjE4M0wzMTQuNyAyMjAuNTUxQzMxNC41OTcgMjIwLjkzOCAzMTQuODM1IDIyMS4zMDIgMzE1LjIzMSAyMjEuMzY0TDMyNC41MzkgMjIyLjgzQzMyNC45MzUgMjIyLjg5MyAzMjUuMzM4IDIyMi42MjkgMzI1LjQ0IDIyMi4yNDJMMzI5LjIzMyAyMDcuODc1QzMyOS4zMzYgMjA3LjQ4OCAzMjkuNzM5IDIwNy4yMjQgMzMwLjEzNSAyMDcuMjg2TDMzNS4zOCAyMDguMTEzWiIgZmlsbD0idXJsKCNtYWluKSIgLz48cGF0aCBkPSJNMzE5LjI4MiAyNjkuMDg3QzMxOS44MjQgMjY5LjE3MyAzMjAuMzE5IDI2OC42NjEgMzIwLjE4NiAyNjguMTU0TDMxNC4yOTIgMjQ1Ljc3QzMxNC4xNTEgMjQ1LjIzNiAzMTMuNDMxIDI0NS4xMjMgMzEzLjAzMSAyNDUuNTcyTDI5Ni4yNjEgMjY0LjM4NkMyOTUuODggMjY0LjgxMiAyOTYuMDc2IDI2NS40MzMgMjk2LjYxOCAyNjUuNTE4TDMwMS44NjQgMjY2LjM0NEMzMDIuMjU5IDI2Ni40MDcgMzAyLjQ5NyAyNjYuNzcxIDMwMi4zOTUgMjY3LjE1OEwyOTguNjAyIDI4MS41MjZDMjk4LjUgMjgxLjkxMyAyOTguNzM3IDI4Mi4yNzcgMjk5LjEzMyAyODIuMzM5TDMwOC40NDEgMjgzLjgwNUMzMDguODM3IDI4My44NjcgMzA5LjI0IDI4My42MDQgMzA5LjM0MyAyODMuMjE3TDMxMy4xMzYgMjY4Ljg0OUMzMTMuMjM4IDI2OC40NjIgMzEzLjY0MSAyNjguMTk5IDMxNC4wMzcgMjY4LjI2MUwzMTkuMjgyIDI2OS4wODdaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+PHBhdGggZD0iTTMwMy4xODQgMzMwLjA2MkMzMDMuNzI2IDMzMC4xNDggMzA0LjIyMSAzMjkuNjM2IDMwNC4wODggMzI5LjEyOEwyOTguMTk0IDMwNi43NDVDMjk4LjA1MyAzMDYuMjExIDI5Ny4zMzMgMzA2LjA5OCAyOTYuOTMzIDMwNi41NDdMMjgwLjE2MyAzMjUuMzYxQzI3OS43ODIgMzI1Ljc4NyAyNzkuOTc5IDMyNi40MDggMjgwLjUyIDMyNi40OTNMMjg1Ljc2NiAzMjcuMzE5QzI4Ni4xNjEgMzI3LjM4MiAyODYuMzk5IDMyNy43NDYgMjg2LjI5NyAzMjguMTMzTDI4Mi41MDQgMzQyLjUwMUMyODIuNDAyIDM0Mi44ODggMjgyLjYzOSAzNDMuMjUyIDI4My4wMzUgMzQzLjMxNEwyOTIuMzQ0IDM0NC43OEMyOTIuNzM5IDM0NC44NDIgMjkzLjE0MiAzNDQuNTc5IDI5My4yNDUgMzQ0LjE5MkwyOTcuMDM4IDMyOS44MjRDMjk3LjE0IDMyOS40MzcgMjk3LjU0MyAzMjkuMTc0IDI5Ny45MzkgMzI5LjIzNkwzMDMuMTg0IDMzMC4wNjJaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjUiIC8+PHBhdGggc3Ryb2tlPSJ1cmwoI21haW4pIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTI5MC4xMDkgNDYzLjQxOEMyOTIuMzU4IDQ1NC45MDIgMzAxLjIzMyA0NDkuMTEgMzA5LjkzMyA0NTAuNDhMNzcxLjA3IDUyMy4wOTZDNzc5Ljc3IDUyNC40NjcgNzg1IDUzMi40OCA3ODIuNzUyIDU0MC45OTZMNjkyLjA4NiA4ODQuNDE4TDE5OS40NDMgODA2Ljg0TDI5MC4xMDkgNDYzLjQxOFoiIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjAuMTQiIC8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0idXJsKCNtYWluKSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik03ODcuNTg5IDIzNy4zNDlMNDYwLjM1NCAxODUuODE4TDQwNi4zMjUgMzkwLjQ2OUM0MDMuODcyIDM5OS43NTkgNDA5LjU3OCA0MDguNTAxIDQxOS4wNjkgNDA5Ljk5Nkw3MTEuOTM0IDQ1Ni4xMTRDNzIxLjQyNSA0NTcuNjA5IDczMS4xMDcgNDUxLjI5IDczMy41NiA0NDJMNzg3LjU4OSAyMzcuMzQ5Wk02NjAuMjY5IDI0NS4wMUM2NTUuNTIzIDI0NC4yNjMgNjUwLjY4MiAyNDcuNDIzIDY0OS40NTYgMjUyLjA2OEw2MDcuMzg2IDQxMS40MThDNjA2LjE2IDQxNi4wNjMgNjA5LjAxMyA0MjAuNDM0IDYxMy43NTkgNDIxLjE4MUw2ODIuNDk5IDQzMi4wMDZDNjg3LjI0NSA0MzIuNzUzIDY5Mi4wODYgNDI5LjU5NCA2OTMuMzEyIDQyNC45NDlMNzM1LjM4MiAyNjUuNTk5QzczNi42MDggMjYwLjk1NCA3MzMuNzU1IDI1Ni41ODMgNzI5LjAxIDI1NS44MzVMNjYwLjI2OSAyNDUuMDFaIiBmaWxsPSJ1cmwoI21haW4pIiAvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNODY0LjY0MyAyODMuOTM3Qzg2NS4xODYgMjgzLjYwNSA4NjUuNzA4IDI4NC4yNTcgODY1LjIzOSAyODQuNjgzTDg0NC4yNjggMzAzLjcxOUM4NDMuOTM4IDMwNC4wMTggODQ0LjA5MyAzMDQuNTE3IDg0NC41MjYgMzA0LjU0OEw4NTMuNzI2IDMwNS4yMDdDODU0LjE4NCAzMDUuMjQgODU0LjMyMSAzMDUuNzg3IDg1My45NDIgMzA2LjA3MUw4MzMuODg0IDMyMS4xMTJDODMzLjUwNiAzMjEuMzk2IDgzMy42NDMgMzIxLjk0MyA4MzQuMTAxIDMyMS45NzZMODQ0LjAwNyAzMjIuNjg1Qzg0NC40OTEgMzIyLjcyIDg0NC42MDUgMzIzLjMxOSA4NDQuMTc3IDMyMy41OEw3OTcuNzUyIDM1MS45NTRDNzk3LjIwOSAzNTIuMjg2IDc5Ni42ODcgMzUxLjYzNCA3OTcuMTU2IDM1MS4yMDlMODE4LjQwMyAzMzEuOTIyQzgxOC43MzMgMzMxLjYyMiA4MTguNTc3IDMzMS4xMjMgODE4LjE0NSAzMzEuMDkyTDgwOC43NDggMzMwLjQyQzgwOC4yOTIgMzMwLjM4NyA4MDguMTU0IDMyOS44NDMgODA4LjUyOSAzMjkuNTU4TDgyOC4wNTQgMzE0Ljc0NEM4MjguNDMgMzE0LjQ1OSA4MjguMjkxIDMxMy45MTUgODI3LjgzNSAzMTMuODgyTDgxOC4zODkgMzEzLjIwNkM4MTcuOTA0IDMxMy4xNzEgODE3Ljc5IDMxMi41NzIgODE4LjIxOCAzMTIuMzExTDg2NC42NDMgMjgzLjkzN1oiIGZpbGw9IndoaXRlIiAvPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg3ODI3IDAuMTU1NTU3IC0wLjI1NTI2MSAwLjk2Njg3MiAyNTAgNzM1KSI+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSI0MiIgZmlsbD0iI0U1RTdGOCI+RmxlZWsgVGVzdCBBcHA8L3RleHQ+PHRleHQgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB5PSI0MCIgZm9udC1zaXplPSIyMiIgZmlsbD0iIzdGODE5MiI+ZmxlZWsuZXRoPC90ZXh0PjwvZz48aW1hZ2Ugd2lkdGg9IjE2NyIgaGVpZ2h0PSIxNjciIHRyYW5zZm9ybT0ibWF0cml4KDAuOTg3ODI3IDAuMTU1NTU3IC0wLjI1NTI2MSAwLjk2Njg3MiA0NDQuMTE3IDUyNC4xNykiIGhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjJaWEp6YVc5dVBTSXhMakVpSUhodGJHNXpQU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh5TURBd0wzTjJaeUlnZUcxc2JuTTZlR3hwYm1zOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6RTVPVGt2ZUd4cGJtc2lJSGc5SWpCd2VDSWdlVDBpTUhCNElpQjJhV1YzUW05NFBTSXdJREFnTVRBd01DQXhNREF3SWlCbGJtRmliR1V0WW1GamEyZHliM1Z1WkQwaWJtVjNJREFnTUNBeE1EQXdJREV3TURBaUlIaHRiRHB6Y0dGalpUMGljSEpsYzJWeWRtVWlQZ284Wno0OGNHRjBhQ0JrUFNKTk5UQXdMREV3UXpJeU9TNDBMREV3TERFd0xESXlPUzQwTERFd0xEVXdNR013TERJM01DNDJMREl4T1M0MExEUTVNQ3cwT1RBc05Ea3dZekkzTUM0MkxEQXNORGt3TFRJeE9TNDBMRFE1TUMwME9UQkRPVGt3TERJeU9TNDBMRGMzTUM0MkxERXdMRFV3TUN3eE1Ib2dUVGd4TlN3NE1UVmpMVFF3TGprc05EQXVPUzA0T0M0MkxEY3pMakV0TVRReExqWXNPVFV1TldNdE5UUXVPU3d5TXk0eUxURXhNeTR5TERNMUxURTNNeTQwTERNMVl5MDJNQzR5TERBdE1URTRMalV0TVRFdU9DMHhOek11TkMwek5VTXlOek11Tml3NE9EZ3NNakkxTGprc09EVTFMamtzTVRnMUxEZ3hOWE10TnpNdE9EZ3VOaTA1TlM0MUxURTBNUzQyWXkweU15NHlMVFUwTGprdE16VXRNVEV6TGpJdE16VXRNVGN6TGpSak1DMDJNQzR5TERFeExqZ3RNVEU0TGpVc016VXRNVGN6TGpSak1qSXVOQzAxTXl3MU5DNDJMVEV3TUM0M0xEazFMalV0TVRReExqWnpPRGd1TmkwM015d3hOREV1TmkwNU5TNDFZelUwTGprdE1qTXVNaXd4TVRNdU1pMHpOU3d4TnpNdU5DMHpOV00yTUM0eUxEQXNNVEU0TGpVc01URXVPQ3d4TnpNdU5Dd3pOV00xTXl3eU1pNDBMREV3TUM0M0xEVTBMallzTVRReExqWXNPVFV1TldNME1DNDVMRFF3TGprc056TXNPRGd1Tml3NU5TNDFMREUwTVM0Mll6SXpMaklzTlRRdU9Td3pOU3d4TVRNdU1pd3pOU3d4TnpNdU5HTXdMRFl3TGpJdE1URXVPQ3d4TVRndU5TMHpOU3d4TnpNdU5FTTRPRGdzTnpJMkxqUXNPRFUxTGprc056YzBMakVzT0RFMUxEZ3hOWG9pTHo0OEwyYytDand2YzNablBnPT0iIC8+PGRlZnM+PGZpbHRlciBpZD0iZGlza2V0dGUtc2hhZG93IiB4PSI3MC43NDg5IiB5PSIxOTUuNzEyIiB3aWR0aD0iOTU1LjczMyIgaGVpZ2h0PSI4MzIuNTU4IiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+PGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgLz48ZmVCbGVuZCBpbj0iU291cmNlR3JhcGhpYyIgLz48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI0MiIgLz48L2ZpbHRlcj48bGluZWFyR3JhZGllbnQgaWQ9ImJhY2tncm91bmQiIHgxPSI1MzIuNSIgeTE9IjAiIHgyPSI1MzIuNSIgeTI9IjEwNjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEzMTMxMyIgLz48L2xpbmVhckdyYWRpZW50PjxyYWRpYWxHcmFkaWVudCBpZD0iYmFja2dyb3VuZC1yYWRpYWwiIGN4PSIwIiBjeT0iMCIgcj0iMSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTMyLjUgNTMyLjUpIHJvdGF0ZSg4OS45NjEpIHNjYWxlKDczNSkiPjxzdG9wIHN0b3AtY29sb3I9IiMxMjM0NTYiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTIzNDU2IiBzdG9wLW9wYWNpdHk9IjAiIC8+PC9yYWRpYWxHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImRpc2tldHRlLWdyYWRpZW50IiB4MT0iOTI1LjYyNiIgeTE9IjI1Ni44OTYiIHgyPSIxMzYuNzc5IiB5Mj0iODAwLjIwMyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiMxMjM0NTYiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMkMzMTNGIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJtYWluIj48c3RvcCBzdG9wLWNvbG9yPSIjMTIzNDU2IiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg=='
      );
    });
  });
});
