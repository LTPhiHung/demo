import { Card, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Switch, Tag } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Redeem } from '../interfaces/redeem';

interface Props {
  questData: Redeem | null;
  setIsFormComplete: (value: boolean) => void;
  isInvisible?: boolean;
}

export const RedeemFormComponent: React.FC<Props> = ({ questData, isInvisible=false }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('redeem');
  const [formData, setFormData] = useState(questData);
  const [isPercentage, setIsPercentage] = useState(questData?.isPercentage);

  const accountRanksOptions = [
    { label: t('accountRanks.sliver'), value: 1 },
    { label: t('accountRanks.gold'), value: 2 },
    { label: t('accountRanks.diamond'), value: 3 },
  ];
  
  return (
    <div style={{ maxWidth: 1200, width: '100%' }}>
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 7, style: { textAlign: 'left' } }}
        wrapperCol={{ span: 17 }}
        scrollToFirstError
        disabled={isInvisible}
        initialValues={formData || undefined} // Dùng initialValues thay cho defaultValue
        onValuesChange={(allValues) => {
          setFormData((prev) => ({ ...prev, ...allValues }));
        }}
      >
        {/* Redeem Code */}
        <Form.Item
          label={t('redeemCode') + ' :'}
          name="redeemCode"
          rules={[{ required: true, message: t('title.message') }]}
          wrapperCol={{ flex: 1 }}
        >
          <Input placeholder={'e.g. ‘510ZERO’'} maxLength={200} />
        </Form.Item>
        
        {isInvisible && (<>
            <Form.Item
            label={t('status.label') + ' :'}
            name="status"
            wrapperCol={{ flex: 1 }}
            >
                <Tag color={questData?.status === 1 ? 'green' : 'red'}>
                    {questData?.status === 1 ? t('status.available') :  t('status.soldOut')}
                </Tag>
            </Form.Item>
            <Form.Item
            label={t('redeemedQuantities') + ' :'}
            name="redeemQuantities"
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
            wrapperCol={{ flex: 1 }}
            >
            <Input type="number" placeholder="Enter redeemed quantities" />
            </Form.Item>
        </>)}
         {/* Point */}
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
          wrapperCol={{ flex: 1 }}
        >
          <InputNumber style={{}} placeholder="Enter points" />
        </Form.Item>

         {/* Allowed Quantities */}
        <Form.Item
          label={t('allowedQuantities') + ' :'}
          name="allowedQuantities"
          rules={[
            {
              type: 'number',
              min: 1,
              max: 1000000,
              transform: (value) => (value !== '' ? Number(value) : value),
              message: 'Enter a number greater than 1 and less than or equal to 1,000,000.',
            },
          ]}
          wrapperCol={{ flex: 1 }}
        >
          <Input type="number" placeholder="Enter allowed quantities" />
        </Form.Item>


          {/* Validity Period */}
        <Form.Item
          label={t('validityPeriod') + ' :'}
          name="validityPeriod"
          rules={[
            {
              type: 'number',
              min: 1,
              max: 1000,
              transform: (value) => (value !== '' ? Number(value) : value),
              message: 'Enter a number greater than 1 and less than or equal to 1,000.',
            },
          ]}
          wrapperCol={{ flex: 1 }}
        >
          <Input type="number" placeholder="Enter validity period" disabled={false} />
        </Form.Item>

        {/* Account Ranks */}
        <Form.Item
          label={t('accountRanks.label') + ' :'}
          name="accountRank"
          rules={[{ required: true, message: t('accountRanks.message'), type: 'array' }]}
        >
          <Checkbox.Group options={accountRanksOptions} disabled={false}/>
        </Form.Item>

        {/* Public User */}
        <Form.Item
          label={t('publicUser') + ' :'}
          name="publicToUser"
        //   valuePropName="checked"
          wrapperCol={{ flex: 1 }}
        >
          <Switch />
        </Form.Item>
        
        <Form.Item
        label={t('discountType') + ' :'}
        name="isPercentage"
        rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá' }]}
      >
        <Radio.Group
          onChange={(e) => setIsPercentage(e.target.value)}
          options={[
            { label: t('percentage'), value: true },
            { label: t('fixAmountDetail'), value: false },
          ]}
        />
      </Form.Item>
          <Row>
            <Col span={7} >
            </Col>
            <Col span={17}>
                <Card style={{ width: '100%' }}>
                    {/* Conditional fields */}
                    {isPercentage ? (
                        <>
                        <Form.Item
                            label={t('percentageOff') + ' :'}
                            name="percentageOff"
                            rules={[
                                { required: true, message: 'Vui lòng nhập phần trăm giảm giá' },
                                {
                                    type: 'number',
                                    min: 1,
                                    max: 100,
                                    transform: (value) => (value !== '' ? Number(value) : value),
                                    message: 'Enter a number greater than 1 and less than or equal to 100.',
                                },
                            ]}
                        >
                            <Input type='number' placeholder="Enter percentage off" />
                        </Form.Item>
                        <Form.Item
                            label={t('maximumDiscountAmount') + ' :'}
                            name="maxDiscount"
                            rules={[
                                {
                                type: 'number',
                                min: 1,
                                max: 1000000,
                                transform: (value) => (value !== '' ? Number(value) : value),
                                message: 'Enter a number greater than 1 and less than or equal to 100,000.',
                                },
                            ]}
                        >
                            <Input type="number" placeholder="Enter maximum discount amount" />
                        </Form.Item>
                        </>
                    )

                    : (
                        <Form.Item
                        label={t('fixAmountInput') + ' :'}
                        name="fixAmount"
                        rules={[{ required: true, message: 'Vui lòng nhập số tiền cố định' }]}
                        >
                        <Input placeholder="Enter fixed amount" />
                        </Form.Item>
                    )}
                </Card>
            </Col>
        </Row>

      </Form>
    </div>
  );
};
