import React, { Component } from 'react';

import { Box, Flex, Icon, TextBlock } from 'zbase';
import { Button } from 'z-frontend-elements';
import { color } from 'z-frontend-theme/utils';
import { styled } from 'z-frontend-theme';

interface Props {
  onPageChange: (page: number) => void;
  pageSize: number;
  currentPage: number;
  totalItemsCount: number;
  s?: 'small' | 'medium' | 'large' | 'xsmall';
}

const StyledSpan = styled.span`
  color: ${color('grayscale.d')};
`;

class Pager extends Component<Props> {
  onPageBackwards = () => {
    const pageBackward = this.props.currentPage - 1;
    this.props.onPageChange(pageBackward);
  };

  onPageForwards = () => {
    const pageForward = this.props.currentPage + 1;
    this.props.onPageChange(pageForward);
  };

  getItemRange = (currentPage: number, pageSize: number, totalItemsCount: number) => {
    const start = currentPage * pageSize - pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalItemsCount);
    return (
      <TextBlock my="auto">
        {start}-{end} <StyledSpan>(of {totalItemsCount})</StyledSpan>
      </TextBlock>
    );
  };

  render() {
    const { currentPage, pageSize, totalItemsCount, s: size = 'medium' } = this.props;
    return (
      <Flex align="center">
        <Box order={[2, 1]} mr={[6, 2]} ml={[6, 0]}>
          {this.getItemRange(currentPage, pageSize, totalItemsCount)}
        </Box>
        <Box order={[1, 2]}>
          <Button s={size} disabled={currentPage <= 1} onClick={this.onPageBackwards} mr={1}>
            <Icon iconName="chevron-left" />
          </Button>
        </Box>
        <Box order={3}>
          <Button
            s={size}
            disabled={currentPage >= Math.ceil(totalItemsCount / pageSize)}
            onClick={this.onPageForwards}
          >
            <Icon iconName="chevron-right" />
          </Button>
        </Box>
      </Flex>
    );
  }
}

export default Pager;
