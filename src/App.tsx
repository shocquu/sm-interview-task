import { useState } from 'react';
import { ConfigProvider, theme, Card, Row, Col } from 'antd';
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
            <Row align='middle' justify='center' style={{ height: '100vh', backgroundColor: '#fafafa' }}>
                <Col>
                    <Card style={{ width: 400 }}>
                        <ExampleForm setLarger={setLarger} />
                    </Card>
                </Col>
            </Row>
        </ConfigProvider>
    );
}

export default App;
