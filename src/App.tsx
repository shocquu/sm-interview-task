import { useState } from 'react';
import { ConfigProvider, theme, Card, Row, Col } from 'antd';
import { ExampleForm } from '@/components';

const validateMessages = {
    required: 'To pole jest wymagane',
};

const { useToken } = theme;

function App() {
    const [larger, setLarger] = useState(false);
    const { token } = useToken();

    const fontSize = larger ? 2 * token.fontSize : token.fontSize;

    return (
        <ConfigProvider
            form={{ validateMessages }}
            theme={{
                token: {
                    fontSize,
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
