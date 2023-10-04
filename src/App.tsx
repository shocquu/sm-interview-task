import { useState } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ExampleForm } from '@/components';

const { useToken } = theme;

function App() {
    const [larger, setLarger] = useState(false);
    const { token } = useToken();

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontSize: larger ? 2 * token.fontSize : token.fontSize,
                },
            }}>
            <ExampleForm setLarger={setLarger} />
        </ConfigProvider>
    );
}

export default App;
