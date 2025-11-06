import { Form, Input, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { WelcomeQuest } from '../interfaces/welcomeQuest';

const { TextArea } = Input;

interface Props {
  questData: WelcomeQuest | null;
  setIsFormComplete: (value: boolean) => void;
}

export const WelcomeQuestFormComponent: React.FC<Props> = ({ questData, setIsFormComplete }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('quest');
  const [formData, setFormData] = useState(questData);
  useEffect(() => {
    const checkComplete =
      formData?.title?.trim() !== '' &&
      formData?.description?.trim() !== '' &&
      formData?.expiryDate !== null &&
        (formData?.requiredUploadEvidence === true || formData?.requiredEnterLink === true);;
    setIsFormComplete(checkComplete || false);
  }, [formData]);

  return (
    <div style={{ maxWidth: 1132, width: '100%' }}>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ style: { width: 283, textAlign: 'left' } }}
        scrollToFirstError
        initialValues={formData || undefined} // Dùng initialValues thay cho defaultValue
        onValuesChange={(allValues) => {
          setFormData((prev) => ({ ...prev, ...allValues }));
        }}
      >
        {/* Title */}
        <Form.Item
          label={t('title.label') + ' :'}
          name="title"
          rules={[{ required: true, message: t('title.message') }]}
          wrapperCol={{ flex: 1 }}
        >
          <Input placeholder={t('title.placeholder')} maxLength={200} />
        </Form.Item>

         <Form.Item
          label={t('status.active') + ' :'}
          name="status"
          valuePropName="checked"
          wrapperCol={{ flex: 1 }}
        >
          <Switch />
        </Form.Item>

        {/* Platform */}
        <Form.Item
          label={t('platform') + ' :'}
          name="platform"
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

        {/* Required Upload Image */}
        <Form.Item
          label={t('requiredSwitch.uploadImage') + ' :'}
          name="requiredUploadEvidence"
          valuePropName="checked"
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

        {/* Description */}
        <Form.Item
          label={t('description.label') + ' :'}
          name="description"
          rules={[
            { required: true, message: t('description.message1') },
            { max: 2000, message: t('description.message2') },
          ]}
          wrapperCol={{ flex: 1 }}
        >
          <TextArea placeholder={t('description.placeholder')} rows={3} />
        </Form.Item>
      </Form>
    </div>
  );
};
