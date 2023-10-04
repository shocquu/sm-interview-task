import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import continents from '@/fixtures/continents.json';

enum FormItemName {
    Continent = 'continent',
    Name = 'name',
    Surname = 'surname',
    BirthDate = 'birthDate',
}

type FormData = {
    [FormItemName.Continent]?: string;
    [FormItemName.Name]: string;
    [FormItemName.Surname]?: string;
    [FormItemName.BirthDate]?: string;
};

const initialValues: FormData = {
    [FormItemName.Continent]: continents.Europe,
    [FormItemName.Name]: '',
    [FormItemName.Surname]: undefined,
    [FormItemName.BirthDate]: undefined,
};

const { Option } = Select;
const { useForm, useWatch } = Form;

const validateMessages = {
    required: 'To pole jest wymagane',
};

const ExampleForm = () => {
    const [disabled, setDisabled] = useState(false);
    const [form] = useForm();

    const birthDateWatch = useWatch([FormItemName.BirthDate], form);

    const onFinish = () => {
        alert('sukces');
    };

    const validateName = () => {
        if (
            form.getFieldValue([FormItemName.Continent]).toLowerCase() === 'europe' &&
            form.getFieldValue([FormItemName.Name]).length < 2
        )
            return Promise.reject(new Error('Nie spełnione kryteria'));

        return Promise.resolve();
    };

    useEffect(() => {
        const now = dayjs();
        const selectedDate = dayjs(birthDateWatch);

        // const yearsDiff = now.diff(selectedDate, 'years');
        setDisabled(selectedDate.isAfter(now));
    }, [birthDateWatch]);

    return (
        <Form
            form={form}
            initialValues={initialValues}
            validateMessages={validateMessages}
            validateTrigger={['onSubmit']}
            layout='vertical'
            name='example'
            style={{ maxWidth: 400 }}
            onFinish={onFinish}>
            <Form.Item name={FormItemName.Continent} label='Kontynent' rules={[{ validator: validateName }]}>
                <Select placeholder='Wybierz kontynent' allowClear>
                    {Object.entries(continents).map(([key, value]) => (
                        <Option key={key} value={key}>
                            {value}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item name={FormItemName.Name} label='Imię' rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={FormItemName.Surname} label='Nazwisko'>
                <Input />
            </Form.Item>
            <Form.Item name={FormItemName.BirthDate} label='Data urodzenia'>
                <DatePicker placeholder='Wybierz datę' format='DD-MM-YYYY' style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit' disabled={disabled}>
                    Wyślij
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ExampleForm;
