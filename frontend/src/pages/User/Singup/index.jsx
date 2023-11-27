import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import Api from '@services/Api';
import InputText from '@components/InputText';
import Button from '@components/Button';

export default function Signup(props) {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [formattedCpf, setFormattedCpf] = useState('');
    const [formattedPhone, setFormattedPhone] = useState('');

    const MAX_CPF_LENGTH = 11; // 11 digits for CPF
    const MAX_PHONE_LENGTH = 11; // 11 digits for Brazilian phone number

    const formatCpf = (value) => {
        // Remove non-digit characters
        const cpfOnlyNumbers = value.replace(/\D/g, '');
        if (cpfOnlyNumbers.length <= 6) {
            return cpfOnlyNumbers.replace(/(\d{3})(\d{1,3})?/, '$1.$2');
        } else if (cpfOnlyNumbers.length <= 9) {
            return cpfOnlyNumbers.replace(/(\d{3})(\d{3})(\d{1,3})?/, '$1.$2.$3');
        } else {
            return cpfOnlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})?/, '$1.$2.$3-$4');
        }
    };

    const formatPhoneNumber = (rawValue) => {
        if (!rawValue) return ''; // Return empty if no input
        if (rawValue.length <= 2) {
            return `(${rawValue}`;
        } else if (rawValue.length <= 7) {
            return `(${rawValue.substring(0, 2)}) ${rawValue.substring(2)}`;
        } else {
            return `(${rawValue.substring(0, 2)}) ${rawValue.substring(2, 7)}-${rawValue.substring(7)}`;
        }
    };

    const handleInputChange = (rawValue, formatter, maxLength) => {
        // Strip non-numeric characters
        let numericValue = rawValue.replace(/\D/g, '');

        // Check if the user is trying to delete a formatting character and adjust
        if (numericValue.length > maxLength) {
            numericValue = numericValue.substring(0, maxLength);
        }

        return formatter(numericValue);
    };

    const handleCpfChange = (e) => {
        const newInputValue = e.target.value;
        let newRawValue = newInputValue.replace(/\D/g, ''); // Strip all non-digits

        // Determine if the user is trying to delete a digit or a formatting character
        if (newInputValue.length < formattedCpf.length) {
            // User is deleting, check if the deletion is at the end
            const isDeletingFormatChar = !newInputValue.endsWith(newRawValue[newRawValue.length - 1]);
            if (isDeletingFormatChar && newRawValue.length > 0) {
                // Remove the last digit
                newRawValue = newRawValue.substring(0, newRawValue.length - 1);
            }
        }

        if (newRawValue.length > MAX_CPF_LENGTH) {
            newRawValue = newRawValue.substring(0, MAX_CPF_LENGTH);
        }

        setCpf(newRawValue); // Store the raw CPF value
        setFormattedCpf(formatCpf(newRawValue)); // Update the formatted CPF for display
    };

    const handlePhoneChange = (e) => {
        const newFormattedValue = handleInputChange(e.target.value, formatPhoneNumber, MAX_PHONE_LENGTH);
        setPhone(newFormattedValue.replace(/\D/g, '')); // Store unformatted phone number
        setFormattedPhone(newFormattedValue); // Formatted phone number for display
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Api.post('/user', {
                nome: name,
                cpf: cpf, // Unformatted CPF
                email: email,
                telefone: formattedPhone, // Unformatted phone number
                password: password,
            });
            alert(`Usuário ${data.nome} cadastrado com sucesso!`);
            navigate('/');
        } catch (error) {
            console.log('ERROR ->', error);
            alert(`Erro: ${error.response.data.message}`);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <InputText label="Nome:" placeholder="Ex: Ana Maria" value={name} onChange={(e) => setName(e.target.value)} />
                <InputText label="CPF:" placeholder="Ex: 000.000.000-00" value={formattedCpf} onChange={handleCpfChange} />
                <InputText label="Email:" placeholder="Ex: anamaria@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputText label="Telefone:" placeholder="Ex: (00) 00000-0000" value={formattedPhone} onChange={handlePhoneChange} />
                <InputText label="Senha:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="success" text="Cadastrar" type="submit" />
            </Form>
        </>
    );
}
