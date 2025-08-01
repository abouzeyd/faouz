import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { Link, useLocation, matchPath } from 'react-router-dom';

// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

// project imports
import IconButton from 'components/@extended/IconButton';

import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

export default function NavItem({ item, level, isParents = false, setSelectedID }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = () => {
    if (downLG) handlerDrawerOpen(false);

    if (isParents && setSelectedID) {
      setSelectedID(item.id);
    }
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon
      style={{
        fontSize: drawerOpen ? '1rem' : '1.25rem',
        ...(isParents && { fontSize: 20, stroke: '1.5' })
      }}
    />
  ) : (
    false
  );

  const { pathname } = useLocation();
  const isSelected = !!matchPath({ path: item?.link ? item.link : item.url, end: false }, pathname);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  const [openMenus, setOpenMenus] = useState(false);

  const handleClick = (e) => {
    console.log('handleClick', { e });
    if (item.children) {
      e.preventDefault();
      setOpenMenus((prev) => !prev);
    } else {
      itemHandler();
    }
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <ListItemButton
          component={item.children ? 'div' : Link}
          to={item.children ? undefined : item.url}
          onClick={handleClick}
          target={itemTarget}
          disabled={item.disabled}
          selected={isSelected}
          sx={(theme) => ({
            zIndex: 1201,
            pl: drawerOpen ? `${level * 28}px` : 1.5,
            py: !drawerOpen && level === 1 ? 1.25 : 1,
            ...(drawerOpen && {
              '&:hover': { bgcolor: 'primary.lighter', ...theme.applyStyles('dark', { bgcolor: 'divider' }) },
              '&.Mui-selected': {
                bgcolor: 'primary.lighter',
                ...theme.applyStyles('dark', { bgcolor: 'divider' }),
                borderRight: '2px solid',
                borderColor: 'primary.main',
                color: iconSelectedColor,
                '&:hover': { color: iconSelectedColor, bgcolor: 'primary.lighter', ...theme.applyStyles('dark', { bgcolor: 'divider' }) }
              }
            }),
            ...(!drawerOpen && {
              '&:hover': { bgcolor: 'transparent' },
              '&.Mui-selected': { '&:hover': { bgcolor: 'transparent' }, bgcolor: 'transparent' }
            })
          })}
          // onClick={() => itemHandler()}
        >
          {itemIcon && (
            <ListItemIcon
              sx={(theme) => ({
                minWidth: 28,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 36,
                  height: 36,
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': { bgcolor: 'secondary.lighter', ...theme.applyStyles('dark', { bgcolor: 'secondary.light' }) }
                }),
                ...(!drawerOpen &&
                  isSelected && {
                    bgcolor: 'primary.lighter',
                    ...theme.applyStyles('dark', { bgcolor: 'primary.900' }),
                    '&:hover': { bgcolor: 'primary.lighter', ...theme.applyStyles('dark', { bgcolor: 'primary.darker' }) }
                  })
              })}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
                  {item.title}
                </Typography>
              }
            />
          )}
          {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
          {item.children && (openMenus ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {(drawerOpen || (!drawerOpen && level !== 1)) &&
          item?.actions &&
          item?.actions.map((action, index) => {
            const ActionIcon = action.icon;
            const callAction = action?.function;
            return (
              <IconButton
                key={index}
                {...(action.type === 'function' && {
                  onClick: (event) => {
                    event.stopPropagation();
                    callAction();
                  }
                })}
                {...(action.type === 'link' && {
                  component: Link,
                  to: action.url,
                  target: action.target ? '_blank' : '_self'
                })}
                color="secondary"
                variant="outlined"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 20,
                  zIndex: 1202,
                  width: 20,
                  height: 20,
                  mr: -1,
                  ml: 1,
                  color: 'secondary.dark',
                  borderColor: isSelected ? 'primary.light' : 'secondary.light',
                  '&:hover': { borderColor: isSelected ? 'primary.main' : 'secondary.main' }
                }}
              >
                <ActionIcon style={{ fontSize: '0.625rem' }} />
              </IconButton>
            );
          })}
      </Box>
      {item.children && item.children.length > 0 && openMenus && (
        <Box sx={{ pl: 0 }}>
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} level={level + 1} isParents={false} setSelectedID={setSelectedID} />
          ))}
        </Box>
      )}
    </>
  );
}

NavItem.propTypes = {
  item: PropTypes.any,
  level: PropTypes.number,
  isParents: PropTypes.bool,
  setSelectedID: PropTypes.oneOfType([PropTypes.any, PropTypes.func])
};
