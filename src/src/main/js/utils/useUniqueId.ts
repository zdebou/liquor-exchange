import {useMemo} from 'react';
import {uniqueId} from 'lodash/fp';

const useUniqueId = (inheritedId?: string) => {
	return useMemo(() => (inheritedId ? inheritedId : uniqueId('ID_')), [inheritedId]);
};

export default useUniqueId;
