var app = angular.module('mainapp',['ngRoute']);

app.controller('myCtrl',function($scope,$http){
    $scope.giohangsanpham = []; 
    $scope.sizeao = ['S','M','L','Xl']
    $scope.sizegiay = ['36','37','38','39','40','41','42']
    $scope.timkiem = '';
   
    $scope.sanpham = [];
    $http.get('scr/sanpham.json').then(
        function(res){
            $scope.sanpham = res.data;
            console.log(res);           
        },
        function(res){
            alert('Loi');
        }
    )
    $scope.product = {};      
    $scope.getidsp = function(id){
        for(const item of $scope.sanpham){
            if(item.id == id){
                $scope.product = item;
                break;
            }                   
        } 
        localStorage.setItem('spbyid',angular.toJson($scope.product));
        console.log($scope.product);
        console.log($scope.product);
    }
    $scope.add = function(sp){
        var flag = true;
        for(const item of $scope.giohangsanpham){
            if(item.id == sp.id){
                item.soluong++;
                flag = false;
                break;
            }
        }
        if(flag){
            sp.soluong = 1;
            $scope.giohangsanpham.push(sp);            
        } 
        localStorage.setItem('listspbyid',angular.toJson($scope.giohangsanpham));      
        console.log($scope.giohangsanpham);
        console.log($scope.giohangsanpham.length);
    }   

    $scope.gia = '';
    $scope.kieu = '';
    $scope.sortByprice = function(gia,kieu){
        $scope.gia = gia;
        $scope.kieu = kieu;   
        console.log($scope.gia)      
    }
    $scope.keyword = '';
    $scope.findByKey = function(key){
        $scope.keyword = key;
    }
});
app.controller('indexCtrl',function($scope){

});
app.controller('giohangCtrl',function($scope){

    $scope.$parent.giohangsanpham = angular.fromJson(localStorage.getItem('listspbyid'));
    console.log($scope.giohangsanpham);
    
    $scope.tongtien = function(){
        var tong = 0;
        for(const item of $scope.$parent.giohangsanpham){
            tong += item.price * item.soluong;
        }
        return tong;
    }
    $scope.giamgia = function(){
        var tong = 0;
        var tiengiam = 0;
        for(const item of $scope.$parent.giohangsanpham){
            tong += item.price * item.soluong;
            tonggiam = tong - tong*0.1;
            tiengiam = tong - tonggiam;
        }
        return tiengiam;
    }
    $scope.tongtiengiam = function(){
        var tong = 0;
        var tonggiam = 0;
        for(const item of $scope.$parent.giohangsanpham){
            tong += item.price * item.soluong;
            tonggiam = tong - tong*0.1;
        }
        return tonggiam;
    }   
    $scope.xoa = function(i){
        $scope.$parent.giohangsanpham.splice(i,1);
    }
    $scope.xoahet = function(){
        $scope.$parent.giohangsanpham = [];
    }
});
app.controller('detailspCtrl',function($scope){
    $scope.$parent.product = angular.fromJson(localStorage.getItem('spbyid'));
    console.log($scope.product);

    $scope.add = function(sp){
        var flag = true;
        for(const item of $scope.$parent.giohangsanpham){
            if(item.id == sp.id){
                item.soluong++;
                flag = false;
                break;
            }
        }

        if(flag){
            sp.soluong = 1;
            $scope.$parent.giohangsanpham.push(sp);            
        } 
        localStorage.setItem('listspbyid',angular.toJson($scope.giohangsanpham));      
        console.log($scope.giohangsanpham.length);
    }
    $scope.thumbnail_click = function(file){
        document.getElementById("sp_tn_im").src = file;
        console.log(file);
    }
});