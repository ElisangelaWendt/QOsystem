import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes: React.FC = () => {
    // const  [signed, loading]  = useState(false);

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size='large' color='#999' />
    //         </View>
    //     );
    // }

    return <AppStack />;
};

export default Routes;