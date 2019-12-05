import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  table: {
    borderTop: '1px solid #e0e0e0',
    margin: '16px 0',
  },
});

const Readme: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography component="h1" variant="h6" gutterBottom>
        <strong>
          <big>connpass.tokyo</big>について
        </strong>
      </Typography>
      <Typography variant="body1">
        <big>connpass</big>で東京都内のイベントのみを検索できるサービスです
      </Typography>
      <Typography variant="body2">
        <Link href="https://connpass.com/" target="_blank" underline="always">
          エンジニアをつなぐ IT勉強会支援プラットフォーム <big>connpass</big>
        </Link>
      </Typography>

      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell component="th" variant="head">
              Keyword
            </TableCell>
            <TableCell>
              イベントのタイトル、キャッチ、概要、住所に含まれる文字列を指定します。
              <br />
              カンマ区切りでAND検索になります。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" variant="head">
              City
            </TableCell>
            <TableCell>
              開催される区を指定します。複数選択の場合はOR検索です。
              <br />
              未選択の場合は東京都全体が対象になります。
              <br />
              ※概要などに区名が含まれているイベントもヒットします。
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" variant="head">
              Year & Month
            </TableCell>
            <TableCell>イベントが開催される年月を指定します。</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" variant="head">
              Order
            </TableCell>
            <TableCell>
              検索結果の順番を指定します。
              <br />※
              <Link href="https://connpass.com/about/api/" target="_blank" underline="always">
                connpass API
              </Link>
              の仕様により、開催日昇順はありません。
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Readme;
