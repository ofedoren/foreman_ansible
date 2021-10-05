import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { useQuery } from '@apollo/client';
import variableOverrides from '../../../../graphql/queries/variableOverrides.gql';
import AnsibleVariableOverridesTable from './AnsibleVariableOverridesTable';

import { encodeId } from '../../../../globalIdHelper';
import { extractVariables } from './AnsibleVariableOverridesHelper';
import './AnsibleVariableOverrides.scss';

const AnsibleVariableOverrides = ({ hostId, hostAttrs }) => {
  const { loading, data, error } = useQuery(variableOverrides, {
    variables: {
      hostId,
      id: encodeId('Host', hostId),
      match: `fqdn=${hostAttrs.name}`,
    },
  });

  if (loading) {
    return <Skeleton count={5} />;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <AnsibleVariableOverridesTable
      variables={extractVariables(data.host.allAnsibleRoles.nodes)}
      hostId={hostId}
      hostAttrs={hostAttrs}
    />
  );
};

AnsibleVariableOverrides.propTypes = {
  hostId: PropTypes.number.isRequired,
  hostAttrs: PropTypes.object.isRequired,
};

export default AnsibleVariableOverrides;
