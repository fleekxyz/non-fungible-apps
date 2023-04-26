import { forwardStyledRef } from '@/theme';

import { ButtonProps, StyledButton } from './button.styles';
import { ButtonContent } from './button-content';
import { ButtonSpinner } from './button-spinner';

export const Button = forwardStyledRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      isActive,
      isLoading,
      isDisabled,
      spinnerPlacement = 'start',
      spinner,
      loadingText,
      rightIcon,
      leftIcon,
      isFullWidth,
      children,
      ...ownProps
    } = props;

    const contentProps = {
      rightIcon,
      leftIcon,
      children,
    };

    return (
      <StyledButton
        ref={ref}
        disabled={isDisabled || isLoading}
        data-active={isActive}
        data-loading={isLoading}
        css={{
          width: isFullWidth ? '100%' : undefined,
          ...ownProps?.css,
        }}
        {...ownProps}
      >
        {isLoading && spinnerPlacement === 'start' && (
          <ButtonSpinner label={loadingText} placement={spinnerPlacement}>
            {spinner}
          </ButtonSpinner>
        )}

        {isLoading ? (
          loadingText || (
            <span style={{ opacity: 0 }}>
              <ButtonContent {...contentProps} />
            </span>
          )
        ) : (
          <ButtonContent {...contentProps} />
        )}

        {isLoading && spinnerPlacement === 'end' && (
          <ButtonSpinner label={loadingText} placement={spinnerPlacement}>
            {spinner}
          </ButtonSpinner>
        )}
      </StyledButton>
    );
  }
);
