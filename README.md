# :motorcycle: skidmarker

skidmarker는 레이서를 위한 포트폴리오 웹 서비스입니다. 레이서의 자격사항과 포트폴리오를 기록하고, 다른 레이서의 포트폴리오도 확인할 수 있습니다.  
Flask Back-end와 React Front-end로 동작하며, MySQL Database를 사용합니다. Microsoft Azure VM 기반으로 배포되었고, 개발사항은 수시로 갱신됩니다.  

멋진 자취(skid-mark)를 남겨보세요! :point_right: [skidmarker 서비스 Demo](http://elice-kdt-ai-track-vm-racer-48.koreacentral.cloudapp.azure.com/) :point_left:


## Getting Started

기본적으로 로컬에서 Microsoft Visual Studio Code를 통해 작성되었으며, Python-Flask와 ReactJS 환경이 필요합니다.  
- [React 공식 문서](https://ko.reactjs.org/docs/getting-started.html)  
- [Flask 공식 문서](https://flask-docs-kr.readthedocs.io/ko/latest/)

### Prerequisites

로컬에 아래 사항들이 준비가 되어있어야합니다. 

```
Python 3.9.1
NodeJS 12.21.0
MySQL Client Server 8.0
MySQL Workbench 8.0 (Optional)
```
Windows 10 Powershell에서 관리자 권한으로 chocolatey 커맨드를 통해 설치를 진행했습니다.
```
choco install mysql mysql.workbench python --y
choco install node
```

### Installing

아래 사항들은 Flask 구현에 필요한 Python Packages입니다.

```
pip install -r requirements.txt
```


## Running the tests

1. 로컬의 VS Code의 터미널을 2개 생성합니다.
2. flask 디렉토리에서 python app.py로 Back-end를 실행합니다.
3. react-app 디렉토리에서 yarn start로 Front-end를 실행합니다.
4. Front-end와 Back-end는 각각 localhost:3000과 localhost:5000에서 실행되고 있습니다.

## Deployment / 배포

배포 환경은 Microsoft Azure VM의 Ubuntu18.04 환경입니다.
