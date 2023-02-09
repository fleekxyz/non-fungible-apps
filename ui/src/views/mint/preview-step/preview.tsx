import { Button, Card, Grid, Icon, IconButton, Stepper } from '@/components';
import { SVGPreview } from './svg-preview';

export const Preview = () => {
  const { prevStep } = Stepper.useContext();
  //TODO get from context
  const color = '#e87a20';
  const logo =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjU2cHgiIGhlaWdodD0iMjQwcHgiIHZpZXdCb3g9IjAgMCAyNTYgMjQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIj4KICAgIDx0aXRsZT5NZXRhTWFzazwvdGl0bGU+CiAgICA8Zz4KCQkJCTxwb2x5Z29uIGZpbGw9IiNFMTc3MjYiIHBvaW50cz0iMjUwLjA2NjAxOCAtOC44OTY1MTc5MWUtMTUgMTQwLjIxODU1MyA4MS4yNzkzMTMzIDE2MC42NDU2NDMgMzMuMzc4NzcyNiI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0UyNzYyNSIgcG9pbnRzPSI2LjE5MDYyMDE2IDAuMDk1NTI2NzA1MyA5NS4zNzE1NTI2IDMzLjM4NDY1IDExNC43Njc5MjMgODEuOTEzMjc4NCI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0UyNzYyNSIgcG9pbnRzPSIyMDUuODU5OTg2IDE3Mi44NTgwMjYgMjU0LjQxMDY0NyAxNzMuNzgyMDIzIDIzNy40NDI5ODggMjMxLjQyNDI1MiAxNzguMjAwNDI5IDIxNS4xMTI3MzYiPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiNFMjc2MjUiIHBvaW50cz0iNTAuMTM5MTYxOSAxNzIuODU3OTcxIDc3LjY5NjQyODkgMjE1LjExMjg4IDE4LjU1MzA1NzkgMjMxLjQyNTMxNyAxLjY4ODQ2ODI4IDE3My43ODIwMzYiPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiNFMjc2MjUiIHBvaW50cz0iMTEyLjEzMDcyNCA2OS41NTE2NDcyIDExNC4xMTUzODggMTMzLjYzNTA4NSA1NC43NDQzNDQgMTMwLjkzMzkwNSA3MS42MzE5NTQxIDEwNS40NTY0NDggNzEuODQ1Njk3NCAxMDUuMjEwNjY4Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRTI3NjI1IiBwb2ludHM9IjE0My4yNTQyMzcgNjguODM2OTE4NiAxODQuMTUzOTk5IDEwNS4yMTMzOTIgMTg0LjM2NTUxNCAxMDUuNDU3MTkgMjAxLjI1MzUzNyAxMzAuOTM0NjU2IDE0MS44OTYzMiAxMzMuNjM1MjI2Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRTI3NjI1IiBwb2ludHM9Ijc5LjQzNDc3NzYgMTczLjA0Mzk1NyAxMTEuODUzMTQ1IDE5OC4zMDI3NzQgNzQuMTk1MTQwMSAyMTYuNDg0Mzg0Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRTI3NjI1IiBwb2ludHM9IjE3Ni41NzA3OCAxNzMuMDQwMDA5IDE4MS43MDE2NzIgMjE2LjQ4NDUyMyAxNDQuMTQ5MzYzIDE5OC4zMDEyMDMiPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiNENUJGQjIiIHBvaW50cz0iMTQ0Ljk3NzkyMiAxOTUuOTIxNjQyIDE4My4wODQ4NzkgMjE0LjM3MzUzMSAxNDcuNjM3Nzc5IDIzMS4yMjAzNTQgMTQ4LjAwNTgxOCAyMjAuMDg1NzA0Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRDVCRkIyIiBwb2ludHM9IjExMS4wMTEzMyAxOTUuOTI5OTgyIDEwOC4xMDIwOTMgMjE5LjkwMzU5IDEwOC4zNDA4MzggMjMxLjIwNzIzNyA3Mi44MTA1MTQ1IDIxNC4zNzM2NjUiPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiMyMzM0NDciIHBvaW50cz0iMTAwLjAwNzE2NiAxNDEuOTk4ODU2IDEwOS45NjUxNzIgMTYyLjkyNjgyMiA3Ni4wNjE1OTQ1IDE1Mi45OTUyNzciPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiMyMzM0NDciIHBvaW50cz0iMTU1Ljk5MTU3OSAxNDIuMDAwOTQxIDE4MC4wNDk3MTYgMTUyLjk5NDU5NCAxNDYuMDM2MDggMTYyLjkyMzYzOCI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0NDNjIyOCIgcG9pbnRzPSI4Mi4wMjYzOTYyIDE3Mi44MzA0MDEgNzYuNTQ1OTgyMSAyMTcuODcwMDIzIDQ3LjE3MzEyMjEgMTczLjgxNDk1MiI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0NDNjIyOCIgcG9pbnRzPSIxNzMuOTc2MTExIDE3Mi44MzA1IDIwOC44MzA0NjIgMTczLjgxNTA4MSAxNzkuMzQ3MDE2IDIxNy44NzE1MTQiPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiNDQzYyMjgiIHBvaW50cz0iMjAyLjExMjI2NyAxMjguMzg3MzQyIDE3Ni43NDY3NzkgMTU0LjIzODQyNCAxNTcuMTkwMzM0IDE0NS4zMDEzNTIgMTQ3LjgyNjg1IDE2NC45ODUyNjUgMTQxLjY4ODY0NSAxMzEuMTM2NDI5Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjQ0M2MjI4IiBwb2ludHM9IjUzLjg3NTM4NjUgMTI4LjM4Njg3OSAxMTQuMzA5NTg1IDEzMS4xMzY0MjkgMTA4LjE3MTM4IDE2NC45ODUyNjUgOTguODA2MTQyNSAxNDUuMzAzODU2IDc5LjM1MjUxMDcgMTU0LjIzODgyMyI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0UyNzUyNSIgcG9pbnRzPSI1Mi4xNjU2MDYgMTIzLjA4MjQ4NiA4MC44NjM5MDg0IDE1Mi4yMDMzODYgODEuODU4NDgxMiAxODAuOTUyMjc4Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRTI3NTI1IiBwb2ludHM9IjIwMy44NjMzNDYgMTIzLjAyOTc4NCAxNzQuMTE3NDkxIDE4MS4wMDMwMTcgMTc1LjIzNzQyOCAxNTIuMjAyNzM3Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRTI3NTI1IiBwb2ludHM9IjExMi45MDY3NjIgMTI0Ljg1NTY5MSAxMTQuMDYxNjU4IDEzMi4xMjU2ODIgMTE2LjkxNTc3MSAxNTAuMjM2NTE4IDExNS4wODA5NTQgMjA1Ljg2MTg4NCAxMDYuNDA1ODA0IDE2MS4xNzc0ODYgMTA2LjQwMjk1MyAxNjAuNzE1NDIiPjwvcG9seWdvbj4KCQkJCTxwb2x5Z29uIGZpbGw9IiNFMjc1MjUiIHBvaW50cz0iMTQzLjA3Nzk5NyAxMjQuNzU1NDE3IDE0OS41OTkwNTEgMTYwLjcxNTQ1MSAxNDkuNTk2MTk0IDE2MS4xNzc0ODYgMTQwLjg5OTMzMyAyMDUuOTczNzE0IDE0MC41NTUxNSAxOTQuNzY5MTMgMTM5LjE5ODE2NyAxNDkuOTA3MTI3Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRjU4NDFGIiBwb2ludHM9IjE3Ny43ODg0NzkgMTUxLjA0NTk3NSAxNzYuODE3MTggMTc2LjAyMzg5NyAxNDYuNTQzMzQyIDE5OS42MTExOSAxNDAuNDIzMyAxOTUuMjg3MTIgMTQ3LjI4MzQyNyAxNTkuOTUxNjM0Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRjU4NDFGIiBwb2ludHM9Ijc4LjMxNjcwNTMgMTUxLjA0NjQ1NSAxMDguNzE2NDY0IDE1OS45NTI0MjcgMTE1LjU3NjQzNyAxOTUuMjg3MTIgMTA5LjQ1NjM4NSAxOTkuNjExMTk3IDc5LjE4MDczNDQgMTc2LjAyMTg4MSI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0MwQUM5RCIgcG9pbnRzPSI2Ny4wMTgwOTc4IDIwOC44NTc1OTcgMTA1Ljc1MDE0MyAyMjcuMjA5NTAyIDEwNS41ODYxOTQgMjE5LjM3Mjg2OCAxMDguODI2ODM1IDIxNi41MjgzMjggMTQ3LjE2MDY5NCAyMTYuNTI4MzI4IDE1MC41MTg3NTggMjE5LjM2MzM0MiAxNTAuMjcxMzc1IDIyNy4xOTQ0NzcgMTg4Ljc1NzczMyAyMDguOTAzOTc4IDE3MC4wMzAyOTIgMjI0LjM3OTUwOSAxNDcuMzg0NjExIDIzOS45MzMzMTUgMTA4LjUxNjQ4NCAyMzkuOTMzMzE1IDg1Ljg4NTU1MDMgMjI0LjMxNTk0MSI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iIzE2MTYxNiIgcG9pbnRzPSIxNDIuMjAzNTAyIDE5My40NzkzNjcgMTQ3LjY3OTc2NCAxOTcuMzQ3NzAxIDE1MC44ODg5NjQgMjIyLjk1MjQ5NCAxNDYuMjQ0NzA2IDIxOS4wMzA5NTcgMTA5Ljc2OTI5OSAyMTkuMDMwOTU3IDEwNS4yMTM0NDcgMjIzLjAzMTM5OCAxMDguMzE3MjY4IDE5Ny4zNDk2NjMgMTEzLjc5NTQyOSAxOTMuNDc5MzY3Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjNzYzRTFBIiBwb2ludHM9IjI0Mi44MTQyNTEgMi4yNDk3ODk0NiAyNTYgNDEuODA3Mjc2NSAyNDcuNzY1MzM3IDgxLjgwMzY5MiAyNTMuNjI5MDM4IDg2LjMyNzQyMjEgMjQ1LjY5NDQwNyA5Mi4zODEyMDk3IDI1MS42NTc1MjUgOTYuOTg2NTg3OSAyNDMuNzYxMjA2IDEwNC4xNzgyNDcgMjQ4LjYwOTEwNiAxMDcuNjg4OTcyIDIzNS43NDMzNjYgMTIyLjcxNDgwMyAxODIuOTczMzg2IDEwNy4zNTAzNjQgMTgyLjUxNjA3OSAxMDcuMTA1MjQ0IDE0NC40ODg5ODIgNzUuMDI2NzQxNCI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iIzc2M0UxQSIgcG9pbnRzPSIxMy4xODYwMDU0IDIuMjQ5Nzg1NTcgMTExLjUxMTUxIDc1LjAyNjc0MDIgNzMuNDg0NDExOCAxMDcuMTA1MjQ0IDczLjAyNzEwMjMgMTA3LjM1MDM2NSAyMC4yNTY3Mzg4IDEyMi43MTQ4MDQgNy4zOTEyMTI5MSAxMDcuNjg4OTI3IDEyLjIzNTI3MDYgMTA0LjE4MDc1MSA0LjM0MjUxMDAxIDk2Ljk4NjU5MjMgMTAuMjk0NTU2NiA5Mi4zODYyMTc5IDIuMjQxMzM3MDMgODYuMzE1MDk5IDguMzI2Mjk2OTEgODEuNzg4NjY3MSAtOC44OTY1MTc5MWUtMTUgNDEuODA4NzUzNCI+PC9wb2x5Z29uPgoJCQkJPHBvbHlnb24gZmlsbD0iI0Y1ODQxRiIgcG9pbnRzPSIxODAuMzkxNjM4IDEwMy45OTAzNjMgMjM2LjMwNDg3MyAxMjAuMjY5MTc3IDI1NC40NzAyNDUgMTc2LjI1NDcxOSAyMDYuNTQ2NDQ1IDE3Ni4yNTQ2MiAxNzMuNTI1NTMyIDE3Ni42NzEyODIgMTk3LjUzOTY1NyAxMjkuODYzMjg0Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRjU4NDFGIiBwb2ludHM9Ijc1LjYwODAzNjMgMTAzLjk5MDM3NiA1OC40NTY4MTkxIDEyOS44NjMyODQgODIuNDc0MTg2NSAxNzYuNjcxMjgyIDQ5LjQ2OTM5MTMgMTc2LjI1NDcxOSAxLjYzMDUzMjcxIDE3Ni4yNTQ3MTkgMTkuNjkzODk2OCAxMjAuMjY5NTQ4Ij48L3BvbHlnb24+CgkJCQk8cG9seWdvbiBmaWxsPSIjRjU4NDFGIiBwb2ludHM9IjE2My4zODM4OTggMzMuMTExNzM4NSAxNDcuNzQ0NjkxIDc1LjM1MDUwNDcgMTQ0LjQyNTg1MiAxMzIuNDExMzUyIDE0My4xNTU5MzQgMTUwLjI5NTk4NiAxNDMuMDU1MTk1IDE5NS45ODM1MTQgMTEyLjk0Mzc4OCAxOTUuOTgzNTE0IDExMi44NDYxNzYgMTUwLjM4MTcwMiAxMTEuNTcyMTE0IDEzMi4zOTU1ODUgMTA4LjI1MTc4NiA3NS4zNTA1MDQ3IDkyLjYxNTA4NTQgMzMuMTExNzM4NSI+PC9wb2x5Z29uPgoJCTwvZz4KPC9zdmc+Cg==';
  const name = 'Mint NFA';
  const size = '26.5rem'; //replace for
  return (
    <Card.Container css={{ p: '$0' }}>
      <SVGPreview color={color} logo={logo} name={name} size={size} ens={''} />

      <Card.Body css={{ p: '$7' }}>
        <Grid css={{ rowGap: '$6' }}>
          <Card.Heading
            title="Mint NFA"
            leftIcon={
              <IconButton
                aria-label="Add"
                colorScheme="gray"
                variant="link"
                icon={<Icon name="back" />}
                css={{ mr: '$2' }}
                onClick={prevStep}
              />
            }
            rightIcon={
              <IconButton
                aria-label="Add"
                colorScheme="gray"
                variant="link"
                icon={<Icon name="info" />}
              />
            }
          />
          {/* TODO replace for real price when integrate with wallet */}
          <span>Minting this NFA will cost 0.0008 MATIC.</span>
          {/* TODO add desabled when user doesnt have enough MATIC */}
          {/* TODO repalce for app name when connect with context */}
          <Button colorScheme="blue" variant="solid">
            Mint NFA
          </Button>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};