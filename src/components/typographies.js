import styled from 'styled-components/native';
import {moderateScale, scale} from 'react-native-size-matters';
import {color} from '../styles/variables';

export const Display5 = styled.Text`
  font-family: 'Oswald-Regular';
  font-size: ${moderateScale(70)}px;
  line-height: ${moderateScale(80)}px;
  color: ${props => props.color || color.gray1};
  height: ${moderateScale(70)}px;
`;

export const Display6 = styled.Text`
  font-family: 'PlusJakartaSans-ExtraLightItalic';
  font-size: ${moderateScale(16)}px;
  line-height: ${moderateScale(24)}px;
  color: ${props => props.color || color.gray1};
`;

export const Heading2 = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${moderateScale(16)}px;
  line-height: ${moderateScale(24)}px;
  color: ${props => props.color || color.gray1};
`;

export const Heading3 = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${moderateScale(24)}px;
  line-height: ${moderateScale(32)}px;
  color: ${props => props.color || color.gray1};
`;

export const Heading4 = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${scale(12)}px;
  line-height: ${moderateScale(16)}px;
  color: ${props => props.color || color.gray1};
`;

export const Heading5 = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(16)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body1 = styled.Text`
  font-family: 'PlusJakartaSans-Light';
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(16)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body2 = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(16)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body3 = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${moderateScale(10)}px;
  line-height: ${moderateScale(14)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body5 = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(16)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body6 = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${moderateScale(10)}px;
  line-height: ${moderateScale(14)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body7 = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${moderateScale(8)}px;
  line-height: ${moderateScale(12)}px;
  color: ${props => props.color || color.gray1};
`;

export const Body8 = styled.Text`
  font-family: 'PlusJakartaSans-Italic';
  font-size: ${moderateScale(8)}px;
  line-height: ${moderateScale(12)}px;
  color: ${props => props.color || color.gray1};
`;
