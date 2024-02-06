import { useOrganizationList } from "@clerk/nextjs";
import React, { useEffect } from 'react';

const OrganizationSetter = () => {
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  useEffect(() => {
    if (isLoaded && userMemberships.data && userMemberships.data.length === 1) {
      // Automatically set the active organization if the user is only part of one
      setActive({ organization: userMemberships.data[0].organization.id });
    }
  }, [isLoaded, userMemberships.data, setActive]);

  if (!isLoaded) {
    return <>Loading...</>;
  }

  // Render your component or return null if you don't need to show anything
  return null;
};

export default OrganizationSetter;
