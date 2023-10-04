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
    [FormItemName.Continent]: continents.asia,
    [FormItemName.Name]: '',
    [FormItemName.Surname]: undefined,
    [FormItemName.BirthDate]: undefined,
};

const { Option } = Select;
const { useForm, useWatch } = Form;

type ExampleFormProps = {
    setLarger: React.Dispatch<React.SetStateAction<boolean>>;
};

const ExampleForm = ({ setLarger }: ExampleFormProps) => {
    const [disabled, setDisabled] = useState(false);
    const [form] = useForm();

    const birthDateWatch = useWatch([FormItemName.BirthDate], form);

    useEffect(() => {
        const now = dayjs();
        const selectedDate = dayjs(birthDateWatch);
        const age = now.diff(selectedDate, 'years');

        setLarger(age > 60);
        setDisabled(selectedDate.isAfter(now));
    }, [birthDateWatch, setLarger]);

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

    return (
        <Form
            form={form}
            initialValues={initialValues}
            validateTrigger={['onSubmit']}
            layout='vertical'
            name='example'
            onFinish={onFinish}>
            <Form.Item name={FormItemName.Continent} label='Kontynent' rules={[{ validator: validateName }]}>
                <Select data-testid='example_continents' placeholder='Wybierz kontynent' allowClear>
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
                <DatePicker
                    data-testid='example_birthDate'
                    placeholder='Wybierz datę'
                    format='DD-MM-YYYY'
                    style={{ width: '100%' }}
                />
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
