import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';



import PropTypes from 'prop-types';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box } from '@mui/material';



export  const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#000',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#fff',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// DashboardLayoutNavigationLinks.jsx
function DashboardLayoutNavigationLinks({ children, window }) {
    const navigate = useNavigate(); 
  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavClick = (segment) => {
    navigate(`${segment}`); // e.g., /dashboard, /summary
  };

  return (
    <DemoProvider window={demoWindow}>
      <AppProvider
        navigation={[
              {
                segment: 'admin/dashboard',
                title: 'Dashboard',
                icon: <DashboardIcon />,
                onClick: () => handleNavClick('dashboard'),
              },
         
           {
            segment: 'admin/createListing',
            title: 'Create Listing',
            icon: <InsertDriveFileIcon />,
            onClick: () => handleNavClick('createListing'),
          },
           {
            segment: 'admin/showListing',
            title: 'Show Listing',
            icon: <InsertDriveFileIcon />,
            onClick: () => handleNavClick('showListing'),
          },
          {
            segment: 'admin/manageOrders',
            title: 'Manage Orders',
            icon: <InsertDriveFileIcon />,
            onClick: () => handleNavClick('manageOrders'),
          },
          {
            segment: 'admin/offers',
            title: 'Post Offers',
            icon: <InsertDriveFileIcon />,
            onClick: () => handleNavClick('offers'),
          }
         
        ]}
        router={undefined}
        theme={demoTheme}
        window={demoWindow}
         branding={{
    title: 
    // (
      // <Typography sx={{ color: '#966819', fontWeight: 'bold' }}   onClick={() => navigate('/Dashboard')}>
        "Perfume Dashboard",
      // </Typography>
    // ),
    logo: <span style={{ display: 'none' }}></span>
  }}
      >
        <DashboardLayout>
          <Box sx={{ p: 2 }}>{children}</Box>
        </DashboardLayout>
      </AppProvider>
    </DemoProvider>
  );
}

DashboardLayoutNavigationLinks.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};

export default DashboardLayoutNavigationLinks;