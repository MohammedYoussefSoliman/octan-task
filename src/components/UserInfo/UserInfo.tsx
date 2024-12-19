import React from 'react';

import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Divider,
  Flex,
  Icon,
  ConfirmModal,
  Popover,
  P3,
} from '@/components';
import { firstLetter, formDataHandler } from '@/helpers/functions';
import urls from '@/helpers/urls';
import { useAppDispatch, useAppSelector, useBreakpoints } from '@/hooks';
import logoutService from '@/state/auth/logoutService';

import { UserWrapper } from './UserInfo.styles';

type Props = {
  firstName: string;
  lastName: string;
  image?: string;
  transparentMode: boolean;
};

export default function UserInfo({
  firstName,
  lastName,
  image,
  transparentMode,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.ui.language);

  const { fireBaseToken } = useAppSelector((state) => state.consumerAuth);

  const [openConfirmModal, setOpenConfirmModal] =
    React.useState<boolean>(false);

  const abbreviation = React.useMemo(
    () => firstLetter(firstName, lastName),
    [firstName, lastName],
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );

  const handlePopoverOpen = (event: React.ChangeEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = React.useCallback(
    (url: string) => {
      navigate(url);
      handlePopoverClose();
    },
    [navigate],
  );

  const { pallet, colors } = useTheme();
  const { medium } = useBreakpoints();

  return (
    <Flex align="center" gap={{ xs: 6, md: 10, lg: 10 }}>
      <UserWrapper
        align="center"
        gap={{ xs: 10, md: 12, lg: 16 }}
        onClick={(event) => event && handlePopoverOpen(event)}
        dir={language === 'ar' ? 'rtl' : 'ltr'}
        transparentMode={transparentMode}
      >
        <Flex align="center" gap={{ xs: 6, md: 8, lg: 10 }}>
          <Avatar abbreviation={abbreviation} image={image} />
          {medium && (
            <P3
              text={`${firstName} ${lastName}`}
              weight={500}
              color={transparentMode ? colors.shades[100] : pallet.primary[500]}
            />
          )}
        </Flex>
        <Flex mb="-2px">
          <Icon
            name="chevron-down"
            color={transparentMode ? colors.shades[100] : pallet.primary[500]}
          />
        </Flex>
      </UserWrapper>
      <Popover target={anchorEl} onClose={handlePopoverClose}>
        <Flex direction="column" gap={{ xs: 6, md: 8 }} fullWidth>
          <Button
            onClick={() => handleNavigate(urls.orders)}
            variant="transparent"
            size="sm"
            fullWidth
          >
            <Flex gap={{ xs: 6, md: 12, lg: 24 }} fullWidth>
              <Icon name="orders" color={colors.grey[400]} />
              <P3 text="myOrders" weight={500} color={pallet.text.heading} />
            </Flex>
          </Button>
          <Divider color={colors.grey[100]} />
          <Button
            onClick={() => handleNavigate(urls.account)}
            variant="transparent"
            size="sm"
            fullWidth
          >
            <Flex gap={{ xs: 6, md: 12, lg: 24 }} fullWidth>
              <Icon name="profile" color={colors.grey[400]} />
              <P3
                text="profileDetails"
                weight={500}
                color={pallet.text.heading}
              />
            </Flex>
          </Button>
          <Divider color={colors.grey[100]} />
          <Button
            onClick={() => setOpenConfirmModal(true)}
            variant="transparent"
            size="sm"
            fullWidth
          >
            <Flex gap={{ xs: 6, md: 12, lg: 24 }} fullWidth>
              <Icon name="logout" color={colors.grey[400]} />
              <P3 text="logout" weight={500} color={pallet.text.heading} />
            </Flex>
          </Button>
        </Flex>
      </Popover>
      <ConfirmModal
        open={openConfirmModal}
        heading="sureLogout"
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={async () => {
          let formDataObj = {};
          if (fireBaseToken && fireBaseToken !== 'refused') {
            formDataObj = {
              'device_token[token]': fireBaseToken,
              'device_token[type]': 'web-consumer',
            };
          }
          const formData = formDataHandler({
            ...formDataObj,
          });
          dispatch(
            logoutService({
              formData,
              onSuccess() {
                navigate(urls.home);
              },
            }),
          );
        }}
        buttonLabel="logout"
      />
    </Flex>
  );
}
