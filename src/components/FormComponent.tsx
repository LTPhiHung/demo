import { Checkbox, DatePicker, Form, Input, Select, Switch } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Quest } from '../interfaces/quest';

const { TextArea } = Input;

interface Props {
  questData: Quest;
  setIsFormComplete: (value: boolean) => void;
}

const accountRanksOptions = [
  { label: 'accountRank.sliver', value: 'sliver' },
  { label: 'accountRank.gold', value: 'gold' },
  { label: 'accountRank.diamond', value: 'diamond' },
];

export const FormComponent: React.FC<Props> = ({ questData, setIsFormComplete }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('quest');
  const [formData, setFormData] = useState(questData);
  console.log(questData)
  useEffect(() => {
    const checkComplete =
      formData.title?.trim() !== '' &&
      formData.point > 0 &&
      (formData.accountRanks?.length ?? 0) > 0 &&
      formData.description?.trim() !== '' &&
      formData.expiryDate !== null &&
        (formData.requiredUploadEvidence === true || formData.requiredEnterLink === true);;
    setIsFormComplete(checkComplete);
  }, [formData]);

  return (
    <div style={{ maxWidth: 1132, width: '100%' }}>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        scrollToFirstError
        initialValues={formData} // Dùng initialValues thay cho defaultValue
        onValuesChange={(allValues) => {
          setFormData((prev) => ({ ...prev, ...allValues }));
        }}
      >
        {/* Active */}
        <Form.Item
          label={t('status.active') + ' :'}
          name="status"
          valuePropName="checked"
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <Switch />
        </Form.Item>

        {/* Title */}
        <Form.Item
          label={t('title.label') + ' :'}
          name="title"
          rules={[{ required: true, message: t('title.message') }]}
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <Input placeholder={t('title.placeholder')} maxLength={200} />
        </Form.Item>

        {/* Expiry Date */}
        <Form.Item
          label={t('expiryDate.label') + ' :'}
          name="expiryDate"
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder={t('expiryDate.description')}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
            allowClear
          />
        </Form.Item>

        {/* Platform */}
        <Form.Item
          label={t('platform') + ' :'}
          name="platform"
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <Select allowClear placeholder={t('status.desciption')}>
            <Select.Option value={0}>Other</Select.Option>
            <Select.Option value={1}>Facebook</Select.Option>
            <Select.Option value={2}>Instagram</Select.Option>
            <Select.Option value={3}>YouTube</Select.Option>
            <Select.Option value={4}>Telegram</Select.Option>
            <Select.Option value={5}>Tiktok</Select.Option>
            <Select.Option value={6}>Twitter</Select.Option>
            <Select.Option value={7}>Discord</Select.Option>
          </Select>
        </Form.Item>

        {/* Point */}
        <Form.Item
          label={t('point.label') + ' :'}
          name="point"
          rules={[
            { required: true, message: t('point.message1') },
            {
              type: 'number',
              min: 1,
              max: 100000,
              transform: (value) => (value !== '' ? Number(value) : value),
              message: t('point.message2'),
            },
          ]}
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <Input type="number" placeholder="Enter points" />
        </Form.Item>

        {/* Account Ranks */}
        <Form.Item
          label={t('accountRanks.label') + ' :'}
          name="accountRanks"
          rules={[{ required: true, message: t('accountRanks.message'), type: 'array' }]}
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <Checkbox.Group options={accountRanksOptions} />
        </Form.Item>

        {/* Required Upload Image */}
        <Form.Item
          label={t('requiredSwitch.uploadImage') + ' :'}
          name="requiredUploadEvidence"
          valuePropName="checked"
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
          dependencies={['requiredEnterLink']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const other = getFieldValue('requiredEnterLink');
                if (value || other) return Promise.resolve();
                return Promise.reject(
                  new Error(t('requiredSwitch.message'))
                );
              },
            }),
          ]}
        >
          <Switch />
        </Form.Item>

        {/* Required Enter Link */}
        <Form.Item
          label={t('requiredSwitch.enterLink') + ' :'}
          name="requiredEnterLink"
          valuePropName="checked"
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
          dependencies={['requiredEnterUpload']}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                const other = getFieldValue('requiredEnterUpload');
                if (value || other) return Promise.resolve();
                return Promise.reject(
                  new Error(t('requiredSwitch.message'))
                );
              },
            }),
          ]}
        >
          <Switch />
        </Form.Item>

        {/* Allow Multiple Submission */}
        <Form.Item
          label={t('allowMultipleSubmission') + ' :'}
          name="allowSubmitMultiple"
          valuePropName="checked"
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <Switch />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label={t('description.label') + ' :'}
          name="description"
          rules={[
            { required: true, message: t('description.message1') },
            { max: 2000, message: t('description.message2') },
          ]}
          labelCol={{ style: { width: 283, textAlign: 'left' } }}
          wrapperCol={{ flex: 1 }}
        >
          <TextArea placeholder={t('description.placeholder')} rows={3} />
        </Form.Item>
      </Form>
    </div>
  );
};
