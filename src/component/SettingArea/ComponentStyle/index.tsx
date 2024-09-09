/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, InputNumber, Select } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { useComponetsStore } from '../../../stores/useComponetsStore';
import {
  ComponentSetter,
  useComponentConfigStore,
} from '../../../stores/useComponentsConfigStore';
import CssEditor from '../CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export function ComponentStyle() {
  const [form] = Form.useForm();
  const [css, setCss] = useState<string>(`.comp{\n\n}`);

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    form.resetFields(); // 切换组件清空表单
    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });
    setCss(toCssStr(curComponent?.styles || {})); // 显示存在的css
  }, [curComponent]);

  if (!curComponentId || !curComponent) return null;

  function renderFormElememt(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    } else if (type === 'inputNumber') {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  }

  function toCssStr(css: Record<string, any>) {
    let str = `.comp {\n`;
    for (const key in css) {
      let value = css[key];
      if (!value) {
        continue;
      }
      if (
        ['width', 'height'].includes(key) &&
        !value.toString().endsWith('px')
      ) {
        value += 'px';
      }

      str += `\t${key}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  const handleEditorChange = debounce((value) => {
    setCss(value);

    const css: Record<string, unknown> = {};

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', ''); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[
          name.replace(/-\w/, (item) => item.toUpperCase().replace('-', ''))
        ] = value;
      });
      updateComponentStyles(curComponentId, css);
    } catch (e) {
      console.log(e, 'catch');
    }
  }, 500);

  return (
    <Form
      form={form}
      onValuesChange={valueChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 14 }}
    >
      {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElememt(setter)}
        </Form.Item>
      ))}
      <div className="h-[50rem] border border-white">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
