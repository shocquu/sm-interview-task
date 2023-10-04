import dayjs from 'dayjs';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ExampleForm from '@/components/ExampleForm';
import continents from '@/fixtures/continents.json';

window.alert = vi.fn();

const setLarger = () => false;

describe('<ExampleForm />', () => {
    it('renders without errors', () => {
        const { getByText, getByLabelText } = render(<ExampleForm setLarger={setLarger} />);

        expect(getByText('Kontynent')).toBeInTheDocument();
        expect(getByLabelText('Imię')).toBeInTheDocument();
        expect(getByLabelText('Nazwisko')).toBeInTheDocument();
        expect(getByLabelText('Data urodzenia')).toBeInTheDocument();
        expect(getByText('Wyślij')).toBeInTheDocument();
    });

    it('submits the form successfully', async () => {
        const { getByText, getByTestId } = render(<ExampleForm setLarger={setLarger} />);
        const nameInput = getByTestId('example_name');

        fireEvent.change(nameInput, { target: { value: 'test' } });
        fireEvent.click(getByText('Wyślij'));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('sukces');
        });
    });

    it('validates name based on selected continent', async () => {
        const { getByText, getByTestId } = render(<ExampleForm setLarger={setLarger} />);

        const continentSelect = getByTestId('example_continents').firstElementChild!;
        await fireEvent.mouseDown(continentSelect);
        fireEvent.click(document.querySelector(`[title="${continents.europe}"]`)!);
        fireEvent.click(getByText('Wyślij'));

        await waitFor(() => {
            expect(getByText('Nie spełnione kryteria')).toBeInTheDocument();
        });
    });

    it('disables the submit button when birthDate is in the future', () => {
        const { getByText, getByTestId } = render(<ExampleForm setLarger={setLarger} />);

        const futureDate = dayjs().add(7, 'day').format('DD-MM-YYYY');
        console.log(futureDate);

        const datePicker = getByTestId('example_birthDate');
        fireEvent.mouseDown(datePicker);
        fireEvent.change(datePicker, { target: { value: futureDate } });
        fireEvent.click(document.querySelector('.ant-picker-cell-selected')!);

        expect(getByText('Wyślij').parentElement).toBeDisabled();
    });

    it.skip('scales the font when user is +60 yo', () => {
        const { getByLabelText, getByTestId } = render(<ExampleForm setLarger={setLarger} />);

        const date = dayjs(new Date(1960, 1, 1)).format('DD-MM-YYYY');

        console.log(date);

        const datePicker = getByTestId('example_birthDate');
        fireEvent.mouseDown(datePicker);
        fireEvent.change(datePicker, { target: { value: date } });
        fireEvent.click(document.querySelector('.ant-picker-cell-selected')!);

        expect(getByLabelText('Data urodzenia')).toHaveStyle('font-size: 28px');
        // await waitFor(() => {
        // expect(document.querySelector('#example')!).toHaveStyle('font-size: 28px');
        // });
    });
});
